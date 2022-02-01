using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EMSAPI.Models
{
    public record EmployeeDetail
    {
        [Key]
        public int EmployeeId { get; set; }

        [Column(TypeName ="nvarchar(100)")]
        public string Name { get; set; }

        [Column(TypeName = "nvarchar(80)")]
        public string Department { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string EmploymentType { get; set; }

        [Column(TypeName = "nvarchar(10)")]
        public string Contact { get; set; }

        [Column(TypeName = "nvarchar(200)")]
        public string Address { get; set; }

        [Column(TypeName = "nvarchar(200)")]
        public int Salary { get; set; }
    }
}
