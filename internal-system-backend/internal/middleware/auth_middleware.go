package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/auth"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/configuration/rest_errors"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenStr, err := c.Cookie("access_token")
		if err != nil {
			restErr := rest_errors.NewUnauthorizedRequestError("missing access token")
			c.JSON(restErr.Code, restErr)
			c.Abort()
			return
		}

		claims, err := auth.ParseAccessToken(tokenStr)
		if err != nil {
			restErr := rest_errors.NewUnauthorizedRequestError("invalid or expired token")
			c.JSON(restErr.Code, restErr)
			c.Abort()
			return
		}

		c.Set("userID", claims.Subject)
		c.Set("userName", claims.Name)

		c.Next()
	}
}
