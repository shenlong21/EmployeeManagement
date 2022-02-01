using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EMSAPI.Models
{
    public class EmployeeDetailsContext:DbContext 
    {
        public EmployeeDetailsContext(DbContextOptions<EmployeeDetailsContext> options):base(options)
        {

        }

        public DbSet<EmployeeDetail> EmployeeDetails { get;  set; }
        public DbSet<UserDetail> UserDetails { get; set; }

    }
}
