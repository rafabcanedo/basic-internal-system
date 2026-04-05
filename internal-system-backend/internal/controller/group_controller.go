package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/configuration/validation"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/domains"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/service"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/view"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/view/request"
)

type GroupController struct {
	service service.GroupService
}

func NewGroupController(service service.GroupService) *GroupController {
	return &GroupController{service: service}
}

func (gc *GroupController) CreateGroup(c *gin.Context) {
	ownerID := c.GetString("userID")

	var req request.CreateGroupRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		restErr := validation.ValidateGroupError(err)
		c.JSON(restErr.Code, restErr)
		return
	}

	domain := domains.NewGroupDomain(ownerID, req.Name, req.Category)

	created, restErr := gc.service.Create(domain, req.MemberIDs)
	if restErr != nil {
		c.JSON(restErr.Code, restErr)
		return
	}

	c.JSON(http.StatusCreated, view.ConvertGroupDomainToResponse(created))
}

func (gc *GroupController) FindAllGroups(c *gin.Context) {
	ownerID := c.GetString("userID")

	groups, restErr := gc.service.FindAll(ownerID)
	if restErr != nil {
		c.JSON(restErr.Code, restErr)
		return
	}

	groupsResponse := view.ConvertGroupDomainListToResponse(groups)
	c.JSON(http.StatusOK, gin.H{
		"groups": groupsResponse,
		"total":  len(groupsResponse),
	})
}

func (gc *GroupController) FindGroupByID(c *gin.Context) {
	id := c.Param("id")
	ownerID := c.GetString("userID")

	group, restErr := gc.service.FindByID(id, ownerID)
	if restErr != nil {
		c.JSON(restErr.Code, restErr)
		return
	}

	c.JSON(http.StatusOK, view.ConvertGroupDomainToDetailResponse(group))
}

func (gc *GroupController) DeleteGroup(c *gin.Context) {
	id := c.Param("id")
	ownerID := c.GetString("userID")

	restErr := gc.service.Delete(id, ownerID)
	if restErr != nil {
		c.JSON(restErr.Code, restErr)
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "group deleted successfully"})
}

func (gc *GroupController) AddMember(c *gin.Context) {
	groupID := c.Param("id")
	ownerID := c.GetString("userID")

	var req request.AddMemberRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		restErr := validation.ValidateGroupError(err)
		c.JSON(restErr.Code, restErr)
		return
	}

	restErr := gc.service.AddMember(groupID, req.ContactID, ownerID)
	if restErr != nil {
		c.JSON(restErr.Code, restErr)
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "member added successfully"})
}

func (gc *GroupController) RemoveMember(c *gin.Context) {
	groupID := c.Param("id")
	contactID := c.Param("contactId")
	ownerID := c.GetString("userID")

	restErr := gc.service.RemoveMember(groupID, contactID, ownerID)
	if restErr != nil {
		c.JSON(restErr.Code, restErr)
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "member removed successfully"})
}
