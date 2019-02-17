using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TodoApp.WebAPI.Models;

namespace TodoApp.WebAPI.IRepository
{
    public interface ITodoRepository
    {
        Todo Get(int id);
        IEnumerable<Todo> GetAll();
        void RemoveTodo(Todo todo);
        void Add(Todo todo);
    }
}