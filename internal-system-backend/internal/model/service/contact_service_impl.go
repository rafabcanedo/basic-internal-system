package service

import (
	"database/sql"

	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/configuration/logger"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/configuration/rest_errors"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/domains"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/repository"
)

type ContactService interface {
	Create(domain domains.ContactDomainInterface) (domains.ContactDomainInterface, *rest_errors.RestErrors)
	FindAll(ownerID string) ([]domains.ContactDomainInterface, *rest_errors.RestErrors)
	FindByID(id, ownerID string) (domains.ContactDomainInterface, *rest_errors.RestErrors)
	Update(domain domains.ContactDomainInterface) (domains.ContactDomainInterface, *rest_errors.RestErrors)
	Delete(id, ownerID string) *rest_errors.RestErrors
}

type contactService struct {
	repo repository.ContactRepository
}

func NewContactService(repo repository.ContactRepository) ContactService {
	return &contactService{repo: repo}
}

func (s *contactService) Create(domain domains.ContactDomainInterface) (domains.ContactDomainInterface, *rest_errors.RestErrors) {
	created, err := s.repo.Create(domain)
	if err != nil {
		logger.Error("error creating contact", err)
		return nil, rest_errors.NewInternalServerError("error creating contact")
	}

	return created, nil
}

func (s *contactService) FindAll(ownerID string) ([]domains.ContactDomainInterface, *rest_errors.RestErrors) {
	contacts, err := s.repo.FindAll(ownerID)
	if err != nil {
		logger.Error("error finding all contacts", err)
		return nil, rest_errors.NewInternalServerError("error finding contacts")
	}

	return contacts, nil
}

func (s *contactService) FindByID(id, ownerID string) (domains.ContactDomainInterface, *rest_errors.RestErrors) {
	contact, err := s.repo.FindByID(id)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, rest_errors.NewNotFoundError("contact not found")
		}
		logger.Error("error finding contact by id", err)
		return nil, rest_errors.NewInternalServerError("error finding contact")
	}

	if contact.GetOwnerID() != ownerID {
		return nil, rest_errors.NewForbiddenError("access denied")
	}

	return contact, nil
}

func (s *contactService) Update(domain domains.ContactDomainInterface) (domains.ContactDomainInterface, *rest_errors.RestErrors) {
	existing, err := s.repo.FindByID(domain.GetID())
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, rest_errors.NewNotFoundError("contact not found")
		}
		logger.Error("error finding contact for update", err)
		return nil, rest_errors.NewInternalServerError("error updating contact")
	}

	if existing.GetOwnerID() != domain.GetOwnerID() {
		return nil, rest_errors.NewForbiddenError("access denied")
	}

	updated, err := s.repo.Update(domain)
	if err != nil {
		logger.Error("error updating contact", err)
		return nil, rest_errors.NewInternalServerError("error updating contact")
	}

	return updated, nil
}

func (s *contactService) Delete(id, ownerID string) *rest_errors.RestErrors {
	existing, err := s.repo.FindByID(id)
	if err != nil {
		if err == sql.ErrNoRows {
			return rest_errors.NewNotFoundError("contact not found")
		}
		logger.Error("error finding contact for delete", err)
		return rest_errors.NewInternalServerError("error deleting contact")
	}

	if existing.GetOwnerID() != ownerID {
		return rest_errors.NewForbiddenError("access denied")
	}

	if err := s.repo.Delete(id); err != nil {
		logger.Error("error deleting contact", err)
		return rest_errors.NewInternalServerError("error deleting contact")
	}

	return nil
}
