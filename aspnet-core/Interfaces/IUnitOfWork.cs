namespace aspnet_core.Interfaces
{
    public interface IUnitOfWork
    {
        ICountryRepo CountryRepo { get; }
        Task<bool> SaveAsync();
    }
}
