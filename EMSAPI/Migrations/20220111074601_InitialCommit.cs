using Microsoft.EntityFrameworkCore.Migrations;

namespace EMSAPI.Migrations
{
    public partial class InitialCommit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EmployeeDetails",
                columns: table => new
                {
                    EmployeeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Department = table.Column<string>(type: "nvarchar(80)", nullable: true),
                    EmploymentType = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Contact = table.Column<string>(type: "nvarchar(10)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(200)", nullable: true),
                    Salary = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeDetails", x => x.EmployeeId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmployeeDetails");
        }
    }
}
