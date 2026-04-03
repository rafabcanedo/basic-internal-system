package domains

import "time"

type MemberDomain struct {
	ID    string
	Name  string
	Email string
}

type groupDomain struct {
	id        string
	ownerID   string
	name      string
	category  string
	createdAt time.Time
	updatedAt time.Time
	members   []MemberDomain
}

func NewGroupDomain(ownerID, name, category string) GroupDomainInterface {
	return &groupDomain{
		ownerID:  ownerID,
		name:     name,
		category: category,
	}
}

func NewGroupDomainWithID(id, ownerID, name, category string, createdAt, updatedAt time.Time, members []MemberDomain) GroupDomainInterface {
	return &groupDomain{
		id:        id,
		ownerID:   ownerID,
		name:      name,
		category:  category,
		createdAt: createdAt,
		updatedAt: updatedAt,
		members:   members,
	}
}

func (g *groupDomain) GetID() string {
	return g.id
}

func (g *groupDomain) SetID(id string) {
	g.id = id
}

func (g *groupDomain) GetOwnerID() string {
	return g.ownerID
}

func (g *groupDomain) SetOwnerID(id string) {
	g.ownerID = id
}

func (g *groupDomain) GetName() string {
	return g.name
}

func (g *groupDomain) SetName(name string) {
	g.name = name
}

func (g *groupDomain) GetCategory() string {
	return g.category
}

func (g *groupDomain) SetCategory(category string) {
	g.category = category
}

func (g *groupDomain) GetCreatedAt() time.Time {
	return g.createdAt
}

func (g *groupDomain) SetCreatedAt(t time.Time) {
	g.createdAt = t
}

func (g *groupDomain) GetUpdatedAt() time.Time {
	return g.updatedAt
}

func (g *groupDomain) SetUpdatedAt(t time.Time) {
	g.updatedAt = t
}

func (g *groupDomain) GetMembers() []MemberDomain {
	return g.members
}

func (g *groupDomain) SetMembers(members []MemberDomain) {
	g.members = members
}
