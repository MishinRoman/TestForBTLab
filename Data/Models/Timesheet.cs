namespace TestForBTLab.Data.Models
{
    public class Timesheet : BaseModel
    {
        public Reasons Reason { get; set; }
        public DateTime StartDate { get; set; }
        public int Duration { get; set; }
        public bool Discounted { get; set; }
        public string Description { get; set; } = string.Empty;
    }

    public enum Reasons : int
    {
        Отпуск = 1,
        Больничный = 2,
        Прогул = 3
    }
}
