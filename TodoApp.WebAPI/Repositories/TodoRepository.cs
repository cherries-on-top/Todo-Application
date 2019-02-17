using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using TodoApp.WebAPI.IRepository;
using TodoApp.WebAPI.Models;

namespace TodoApp.WebAPI.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private DbSet<Todo> _todos;
        private DbContext _context;

         public TodoRepository(DbContext context)
         {
            _todos = context.Set<Todo>();
            _context = context;
         }

        // Add new todo in database
        public void Add(Todo todo)
        {
            _todos.Add(todo);
            _context.SaveChanges();

        }

        // Return todo with id from database
        public Todo Get(int id)
        {
            return _todos.Find(id);
            
        }

        // Return all todos from database
        public IEnumerable<Todo> GetAll()
        {
            List<Todo> tmpList = _todos.ToList();

            if(tmpList != null)
            {
                return tmpList;
            }

            return new List<Todo>();
            
        }

        // Delete todo from database
        public void RemoveTodo(Todo todo)
        {
            _todos.Remove(todo);
            _context.SaveChanges();

        }


    }
}