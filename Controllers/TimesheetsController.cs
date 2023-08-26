using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

using System.Data.Odbc;

using TestForBTLab.Data.Models;
using TestForBTLab.Repositories.Interfaces;

namespace TestForBTLab.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TimesheetsController:ControllerBase
    {
        private readonly IRepository<Timesheet> _repository;
        public TimesheetsController(IRepository<Timesheet> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<Timesheet>> GetAll()
        {
            var allData = await _repository.GetAllAsync();
            if (allData == null)
            {
                return new List<Timesheet>();
            }

            return allData;
            
        }

        [HttpGet("{id}")]
        public async Task<Timesheet?> GetById(int id)
        {
            var data = await _repository.GetAsync(id);
            return data;
        }

        [HttpPost]
        public async Task<Timesheet> Post([FromBody] Timesheet model)
        {
           
           
                await _repository.AddAsync(model);
                return model;

           
            

        }

        [HttpPatch]
        public async Task<ActionResult<Timesheet>> Update([FromBody] Timesheet model)
        {
            var dataForUpdate = await _repository.GetAsync(model.Id);
            if (dataForUpdate == null)
            {
                return NotFound($"Запись с id: {model.Id} не найдена");
            }

            dataForUpdate.Reason = model.Reason;
            dataForUpdate.Duration = model.Duration;
            dataForUpdate.StartDate = model.StartDate;
            dataForUpdate.Discounted = model.Discounted;
            dataForUpdate.Description = model.Description;



            await _repository.UpdateAsync(dataForUpdate);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Timesheet>> Delete(int id)
        {
            var data = await _repository.GetAsync(id);
            if (data == null)
            {
                return NotFound($"Запись с id: {id} не найдена");
            }
            await _repository.DeleteAsync(id);
            return Ok();
        }
    }
}
