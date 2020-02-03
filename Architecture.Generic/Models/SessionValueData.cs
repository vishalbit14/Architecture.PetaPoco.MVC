namespace Architecture.Generic.Models
{
    public class SessionValueData
    {
        public long UserId { get; set; }
        public int UserRoleId { get; set; }
        public UserSessionModel CurrentUser { get; set; }
    }

    public class UserSessionModel
    {
        public long UserId { get; set; }
        public int UserRoleId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }

        public string FullName => $"{FirstName} {LastName}";
    }
}
