using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IRepo <TClass>
    {
        List<TClass> Get();

        TClass Get(int id);

        TClass Add(TClass @obj);

        TClass Update(TClass @obj);

        bool Delete(int id);
    }
}
