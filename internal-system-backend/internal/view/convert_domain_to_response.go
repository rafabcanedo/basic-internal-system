package view

import (
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/domains"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/view/response"
)

func ConvertDomainToResponse(
	userDomain domains.UserDomainInterface,
) response.UserResponse {
	return response.UserResponse{
		ID:    userDomain.GetID(),
		Name:  userDomain.GetName(),
		Email: userDomain.GetEmail(),
		Phone: userDomain.GetPhone(),
	}
}

func ConvertDomainListToResponse(usersDomain []domains.UserDomainInterface) []response.UserResponse {
	usersResponse := make([]response.UserResponse, len(usersDomain))
	
	for i, user := range usersDomain {
		usersResponse[i] = ConvertDomainToResponse(user)
	}
	return usersResponse
}
