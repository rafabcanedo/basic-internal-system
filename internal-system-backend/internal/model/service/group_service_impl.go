package service

import (
	"database/sql"

	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/configuration/logger"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/configuration/rest_errors"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/domains"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/repository"
)

type GroupService interface {
	Create(domain domains.GroupDomainInterface, memberIDs []string) (domains.GroupDomainInterface, *rest_errors.RestErrors)
	FindAll(ownerID string) ([]domains.GroupDomainInterface, *rest_errors.RestErrors)
	FindByID(id, ownerID string) (domains.GroupDomainInterface, *rest_errors.RestErrors)
	Delete(id, ownerID string) *rest_errors.RestErrors
	AddMember(groupID, contactID, ownerID string) *rest_errors.RestErrors
	RemoveMember(groupID, contactID, ownerID string) *rest_errors.RestErrors
}

type groupService struct {
	repo repository.GroupRepository
}

func NewGroupService(repo repository.GroupRepository) GroupService {
	return &groupService{repo: repo}
}

func (s *groupService) Create(domain domains.GroupDomainInterface, memberIDs []string) (domains.GroupDomainInterface, *rest_errors.RestErrors) {
	for _, contactID := range memberIDs {
		owned, err := s.repo.IsContactOwnedBy(contactID, domain.GetOwnerID())
		if err != nil {
			logger.Error("error checking contact ownership on group create", err)
			return nil, rest_errors.NewInternalServerError("error creating group")
		}
		if !owned {
			return nil, rest_errors.NewBadRequestError("one or more contacts do not belong to the authenticated user")
		}
	}

	created, err := s.repo.Create(domain, memberIDs)
	if err != nil {
		logger.Error("error creating group", err)
		return nil, rest_errors.NewInternalServerError("error creating group")
	}

	return created, nil
}

func (s *groupService) FindAll(ownerID string) ([]domains.GroupDomainInterface, *rest_errors.RestErrors) {
	groups, err := s.repo.FindAll(ownerID)
	if err != nil {
		logger.Error("error finding all groups", err)
		return nil, rest_errors.NewInternalServerError("error finding groups")
	}

	return groups, nil
}

func (s *groupService) FindByID(id, ownerID string) (domains.GroupDomainInterface, *rest_errors.RestErrors) {
	group, err := s.repo.FindByID(id)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, rest_errors.NewNotFoundError("group not found")
		}
		logger.Error("error finding group by id", err)
		return nil, rest_errors.NewInternalServerError("error finding group")
	}

	if group.GetOwnerID() != ownerID {
		return nil, rest_errors.NewForbiddenError("access denied")
	}

	return group, nil
}

func (s *groupService) Delete(id, ownerID string) *rest_errors.RestErrors {
	group, err := s.repo.FindByID(id)
	if err != nil {
		if err == sql.ErrNoRows {
			return rest_errors.NewNotFoundError("group not found")
		}
		logger.Error("error finding group for delete", err)
		return rest_errors.NewInternalServerError("error deleting group")
	}

	if group.GetOwnerID() != ownerID {
		return rest_errors.NewForbiddenError("access denied")
	}

	if err := s.repo.Delete(id); err != nil {
		logger.Error("error deleting group", err)
		return rest_errors.NewInternalServerError("error deleting group")
	}

	return nil
}

func (s *groupService) AddMember(groupID, contactID, ownerID string) *rest_errors.RestErrors {
	group, err := s.repo.FindByID(groupID)
	if err != nil {
		if err == sql.ErrNoRows {
			return rest_errors.NewNotFoundError("group not found")
		}
		logger.Error("error finding group for add member", err)
		return rest_errors.NewInternalServerError("error adding member")
	}

	if group.GetOwnerID() != ownerID {
		return rest_errors.NewForbiddenError("access denied")
	}

	owned, err := s.repo.IsContactOwnedBy(contactID, ownerID)
	if err != nil {
		logger.Error("error checking contact ownership", err)
		return rest_errors.NewInternalServerError("error adding member")
	}
	if !owned {
		return rest_errors.NewBadRequestError("contact does not belong to the authenticated user")
	}

	exists, err := s.repo.MemberExists(groupID, contactID)
	if err != nil {
		logger.Error("error checking member existence", err)
		return rest_errors.NewInternalServerError("error adding member")
	}
	if exists {
		return rest_errors.NewBadRequestError("contact is already a member of this group")
	}

	if err := s.repo.AddMember(groupID, contactID); err != nil {
		logger.Error("error adding member to group", err)
		return rest_errors.NewInternalServerError("error adding member")
	}

	return nil
}

func (s *groupService) RemoveMember(groupID, contactID, ownerID string) *rest_errors.RestErrors {
	group, err := s.repo.FindByID(groupID)
	if err != nil {
		if err == sql.ErrNoRows {
			return rest_errors.NewNotFoundError("group not found")
		}
		logger.Error("error finding group for remove member", err)
		return rest_errors.NewInternalServerError("error removing member")
	}

	if group.GetOwnerID() != ownerID {
		return rest_errors.NewForbiddenError("access denied")
	}

	exists, err := s.repo.MemberExists(groupID, contactID)
	if err != nil {
		logger.Error("error checking member existence", err)
		return rest_errors.NewInternalServerError("error removing member")
	}
	if !exists {
		return rest_errors.NewNotFoundError("member not found in this group")
	}

	if err := s.repo.RemoveMember(groupID, contactID); err != nil {
		logger.Error("error removing member from group", err)
		return rest_errors.NewInternalServerError("error removing member")
	}

	return nil
}
