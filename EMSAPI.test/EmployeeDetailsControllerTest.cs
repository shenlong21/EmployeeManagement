using EMSAPI.Controllers;
using EMSAPI.Models;
using FakeItEasy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;
using static EMSAPI.test.Common;

namespace EMSAPI.test
{
    public class EmployeeDetailsControllerTest
    {

        private readonly EmployeeDetailsContext db;

        public EmployeeDetailsControllerTest()
        {
            db = GetMoqDbContext("EmployeeDetailsTests");
        }

        [Fact]
        public async Task GetEmployees_ReturnsTheEmployeesAsync_FindNothing()
        {
            // arrange
            var controller = new EmployeeDetailController(db);

            // act
            var controllerOutput =  await controller.GetEmployeeDetail();

            //assert
            var resultFromDb = db.EmployeeDetails.Count(); 
          

            Assert.Equal(0, resultFromDb);
           
        }

        [Fact]
        public async Task EmployeeDetails_FindEmployee_ShouldReturnNull()
        {
            // arrange
            int empId = 1;
            var controller = new EmployeeDetailController(db);

            // act
            var controllerOutput = await controller.GetEmployeeDetail(empId);

            // assert
            var result = controllerOutput.Result as NotFoundObjectResult;
            //var resultEmp = result.Value as IEnumerable<EmployeeDetail>;

            Assert.Null(result);
        }


        // POST req check
        [Fact]
        public async Task EmployeeDetails_AddsNewEmployee_ShouldReturnOne()
        {
            // arrange
            var newEmp = GetSampleEmployee(1);
            var controller = new EmployeeDetailController(db);

            // act
            var controllerOutput = controller.PostEmployeeDetail(newEmp);

            // assert
            var totalEmp = db.EmployeeDetails.Count();
            var allEmp = await db.EmployeeDetails.ToListAsync();


            Assert.Equal(1, totalEmp);
            Assert.Equal("Sachin", allEmp[0].Name);

        }


        [Fact]
        public async Task EmployeeDetails_FindEmployee_ShouldReturnNotNull()
        {
            // arrange
            int empId = 1;
            var controller = new EmployeeDetailController(db);

            // act
            var controllerOutput = await controller.GetEmployeeDetail(empId);

            // assert
            var result = controllerOutput.Result as OkObjectResult;
            var resultEmp = result.Value as EmployeeDetail;

            Assert.NotNull(resultEmp);
        }



        [Fact]
        public void EmployeeDetails_UpdateEmployee_ShouldUpdateEmployee()
        {
            // arrange
            int empId = 1;
            EmployeeDetail employeeOld = db.EmployeeDetails.Find(empId);

            EmployeeDetail employeeNew = GetSampleEmployee(1);
            // updating employee detail
            employeeNew.Salary = 1000;

            var controller = new EmployeeDetailController(db);


            // act
            var controllerOutput = controller.PutEmployeeDetail(empId, employeeNew);

            // assert
            var emp = db.EmployeeDetails.Find(empId);


            Assert.Equal(1000, emp.Salary);
            
        }

        [Fact]
        public async Task EmployeeDetails_DeleteEmployee_ShouldDeleteEmployee()
        {
            // arrange
            int empId = 1;
            var controller = new EmployeeDetailController(db);

            // act
            var controllerOutput = await controller.DeleteEmployeeDetail(empId);

            // assert 
            var findEmp = db.EmployeeDetails.Find(empId);
            Assert.Null(findEmp);
        }


        private EmployeeDetail GetSampleEmployee(int id)
        {
            return new EmployeeDetail
            {
                EmployeeId = id,
                Name = "Sachin",
                Department = "Finance",
                EmploymentType = "Full-Time",
                Contact = "1231231231",
                Address = "Gandhinagar",
                Salary = 100
            };
        }
    }

}
