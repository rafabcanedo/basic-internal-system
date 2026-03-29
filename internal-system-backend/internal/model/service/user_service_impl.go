package service

import (
	"database/sql"

	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/configuration/logger"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/configuration/rest_errors"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/domains"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/repository"
)

type UserService interface {
	Create(domain domains.UserDomainInterface) (domains.UserDomainInterface, *rest_errors.RestErrors)
	FindAll() ([]domains.UserDomainInterface, *rest_errors.RestErrors)
	FindByID(id string) (domains.UserDomainInterface, *rest_errors.RestErrors)
	FindByEmail(email string) (domains.UserDomainInterface, *rest_errors.RestErrors)
	Update(domain domains.UserDomainInterface) (domains.UserDomainInterface, *rest_errors.RestErrors)
	Delete(id string) *rest_errors.RestErrors
}

type userService struct {
	repo repository.UserRepository
}

func NewUserService(repo repository.UserRepository) UserService {
	return &userService{repo: repo}
}

func (s *userService) Create(domain domains.UserDomainInterface) (domains.UserDomainInterface, *rest_errors.RestErrors) {
	existing, _ := s.repo.FindByEmail(domain.GetEmail())
	if existing != nil {
		return nil, rest_errors.NewBadRequestError("email already in use")
	}

	if err := domain.EncryptPassword(); err != nil {
		logger.Error("error encrypting password", err)
		return nil, rest_errors.NewInternalServerError("error processing user data")
	}

	created, err := s.repo.Create(domain)
	if err != nil {
		logger.Error("error creating user", err)
		return nil, rest_errors.NewInternalServerError("error creating user")
	}

	return created, nil
}

func (s *userService) FindAll() ([]domains.UserDomainInterface, *rest_errors.RestErrors) {
	users, err := s.repo.FindAll()
	if err != nil {
		logger.Error("error finding all users", err)
		return nil, rest_errors.NewInternalServerError("error finding users")
	}

	return users, nil
}

func (s *userService) FindByID(id string) (domains.UserDomainInterface, *rest_errors.RestErrors) {
	user, err := s.repo.FindByID(id)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, rest_errors.NewNotFoundError("user not found")
		}
		logger.Error("error finding user by id", err)
		return nil, rest_errors.NewInternalServerError("error finding user")
	}

	return user, nil
}

func (s *userService) FindByEmail(email string) (domains.UserDomainInterface, *rest_errors.RestErrors) {
	user, err := s.repo.FindByEmail(email)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, rest_errors.NewNotFoundError("user not found")
		}
		logger.Error("error finding user by email", err)
		return nil, rest_errors.NewInternalServerError("error finding user")
	}

	return user, nil
}

func (s *userService) Update(domain domains.UserDomainInterface) (domains.UserDomainInterface, *rest_errors.RestErrors) {
	if domain.GetPassword() != "" {
		if err := domain.EncryptPassword(); err != nil {
			logger.Error("error encrypting password on update", err)
			return nil, rest_errors.NewInternalServerError("error processing user data")
		}
	}

	updated, err := s.repo.Update(domain)
	if err != nil {
		logger.Error("error updating user", err)
		return nil, rest_errors.NewInternalServerError("error updating user")
	}

	return updated, nil
}

func (s *userService) Delete(id string) *rest_errors.RestErrors {
	if err := s.repo.Delete(id); err != nil {
		logger.Error("error deleting user", err)
		return rest_errors.NewInternalServerError("error deleting user")
	}

	return nil
}
