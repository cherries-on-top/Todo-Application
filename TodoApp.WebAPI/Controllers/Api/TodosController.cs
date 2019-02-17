using Autofac.Integration.WebApi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using TodoApp.WebAPI.IRepository;
using TodoApp.WebAPI.Models;
using TodoApp.WebAPI.Repositories;

namespace TodoApp.WebAPI.Controllers
{
    [EnableCors("*", "*", "*")]
    //[EnableCors(origins: "http://localhost:3000", headers: "*", methods:"*")]

    public class TodosController : ApiController
    {
        private ITodoRepository _todoRepository;


        public TodosController(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        [HttpGet]
        public IEnumerable<Todo> GetTodos()
        {
            return _todoRepository.GetAll();
        }


        [HttpPost]
        public Todo CreateNewTodo(Todo todo)
        {
            Todo newTodo = new Todo
            {
                Id = todo.Id,
                Content = todo.Content
            };

            _todoRepository.Add(newTodo);

            return newTodo;
        }

        [HttpDelete]
        public void DeleteTodo(int id)
        {
            Todo todo = _todoRepository.Get(id);

            if (todo == null)
            {
                return;
            }

            _todoRepository.RemoveTodo(todo);

        }


    }
}
