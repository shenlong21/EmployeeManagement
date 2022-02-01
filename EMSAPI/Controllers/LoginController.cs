using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EMSAPI.Models;
using EMSAPI.Models.Utilities;

namespace EMSAPI.Controllers
{
    [Route("api/authenticate")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        private readonly EmployeeDetailsContext _context;

        public LoginController(EmployeeDetailsContext context)
        {
            _context = context;
        }


        [HttpPost]
        public IActionResult Authenticate(Authenticate authenticate)
        {
            // select * from something where (username = 'username');
            var userDetails = _context.UserDetails.Where(u => u.Username == authenticate.Username).FirstOrDefault<UserDetail>();
            
            if (userDetails == null)
            {
                return NotFound();
            }
            
            else if (userDetails.Password != authenticate.Password)
            {
                return NotFound();
            }

            else
            {
                return Ok(userDetails);
            }
        }
    }
}
