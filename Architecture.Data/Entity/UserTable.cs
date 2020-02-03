using Architecture.Data.Infrastructure.Attributes;
using PetaPoco;

namespace Architecture.Data.Entity
{
    [TableName("Users")]
    [PrimaryKey("UserId")]
    [Sort("UserId", "ASC")]
    public class UserTable : BaseEntity
    {
        public long UserId { get; set; }
        public int UserRoleId { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string AboutMe { get; set; }

        public bool IsActive { get; set; }
    }
}
