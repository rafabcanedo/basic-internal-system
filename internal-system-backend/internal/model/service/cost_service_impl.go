package service

import (
	"database/sql"
	"math"

	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/configuration/logger"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/configuration/rest_errors"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/domains"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/repository"
)

type CostService interface {
	Create(domain domains.CostDomainInterface, ownerPercentage *float64) (domains.CostDomainInterface, *rest_errors.RestErrors)
	FindAll(userID string) ([]domains.CostDomainInterface, *rest_errors.RestErrors)
	FindByID(id, userID string) (domains.CostDomainInterface, *rest_errors.RestErrors)
	Delete(id, userID string) *rest_errors.RestErrors
}

type costService struct {
	repo repository.CostRepository
}

func NewCostService(repo repository.CostRepository) CostService {
	return &costService{repo: repo}
}

func (s *costService) Create(domain domains.CostDomainInterface, ownerPercentage *float64) (domains.CostDomainInterface, *rest_errors.RestErrors) {
	var memberIDs []string

	if domain.GetGroupID() != "" {
		group, err := s.repo.GetGroupMemberIDs(domain.GetGroupID())
		if err != nil {
			logger.Error("error fetching group members for cost creation", err)
			return nil, rest_errors.NewInternalServerError("error creating cost")
		}
		memberIDs = group

		memberCount := len(memberIDs)
		if ownerPercentage != nil {
			if *ownerPercentage <= 0 || *ownerPercentage >= 100 {
				return nil, rest_errors.NewBadRequestError("ownerPercentage must be between 0 and 100 (exclusive)")
			}
			domain.SetOwnerPercentage(*ownerPercentage)
		} else {
			domain.SetOwnerPercentage(math.Round((100.0/float64(memberCount+1))*100) / 100)
		}
	} else {
		domain.SetOwnerPercentage(100)
	}

	created, err := s.repo.Create(domain, memberIDs)
	if err != nil {
		logger.Error("error creating cost", err)
		return nil, rest_errors.NewInternalServerError("error creating cost")
	}

	return created, nil
}

func (s *costService) FindAll(userID string) ([]domains.CostDomainInterface, *rest_errors.RestErrors) {
	costs, err := s.repo.FindAll(userID)
	if err != nil {
		logger.Error("error finding all costs", err)
		return nil, rest_errors.NewInternalServerError("error finding costs")
	}

	return costs, nil
}

func (s *costService) FindByID(id, userID string) (domains.CostDomainInterface, *rest_errors.RestErrors) {
	cost, err := s.repo.FindByID(id)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, rest_errors.NewNotFoundError("cost not found")
		}
		logger.Error("error finding cost by id", err)
		return nil, rest_errors.NewInternalServerError("error finding cost")
	}

	if cost.GetUserID() != userID {
		return nil, rest_errors.NewForbiddenError("access denied")
	}

	return cost, nil
}

func (s *costService) Delete(id, userID string) *rest_errors.RestErrors {
	cost, err := s.repo.FindByID(id)
	if err != nil {
		if err == sql.ErrNoRows {
			return rest_errors.NewNotFoundError("cost not found")
		}
		logger.Error("error finding cost for delete", err)
		return rest_errors.NewInternalServerError("error deleting cost")
	}

	if cost.GetUserID() != userID {
		return rest_errors.NewForbiddenError("access denied")
	}

	if err := s.repo.Delete(id); err != nil {
		logger.Error("error deleting cost", err)
		return rest_errors.NewInternalServerError("error deleting cost")
	}

	return nil
}
