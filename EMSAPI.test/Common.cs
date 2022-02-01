using EMSAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace EMSAPI.test
{
    class Common
    {
        public static EmployeeDetailsContext GetMoqDbContext(string testDatabaseName)
        {
            var options = new DbContextOptionsBuilder<EmployeeDetailsContext>()
                                .UseInMemoryDatabase(databaseName: testDatabaseName)
                                .ConfigureWarnings(x => x.Ignore(InMemoryEventId.TransactionIgnoredWarning))
                                .Options;

            return new EmployeeDetailsContext(options);
        }
    }
}
