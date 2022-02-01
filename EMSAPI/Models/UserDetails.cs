using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EMSAPI.Models
{
    public class UserDetail
    {
        [Key]
        public int UserId { get; set; }

        [Column(TypeName = "nvarchar(80)")]
        public string Username { get; set; }

        [Column(TypeName = "nvarchar(256)")]
        public string Password { get; set; }

    }
}
