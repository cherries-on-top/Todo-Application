using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Cors;
using TodoApp.WebAPI.IRepository;
using TodoApp.WebAPI.Models;
using TodoApp.WebAPI.Repositories;





namespace TodoApp.WebAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var settings = config.Formatters.JsonFormatter.SerializerSettings;
            settings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            settings.Formatting = Formatting.Indented;

            // Web API configuration and services

            //var cors = new EnableCorsAttribute("http://localhost:3000", "*", "*");
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);


            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "CustomApi",
                routeTemplate: "api/{controller}/{action}/{id}"
               // defaults: new { id = RouteParameter.Optional }
            );

            InitializeDI(config, RegisterServices(new ContainerBuilder()));

        }     


        public static void InitializeDI(HttpConfiguration config, IContainer container)
        {
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);

        }

        private static Autofac.IContainer RegisterServices(ContainerBuilder builder)
        {
          
            //Register your Web API controllers.  
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            var assemblies = AppDomain.CurrentDomain.GetAssemblies();
            builder.RegisterAssemblyModules(assemblies);

            builder.RegisterType<TodoDbEntities>()
                   .As<DbContext>()
                   .InstancePerRequest();

            
            builder.RegisterType(typeof(TodoRepository))
                   .As(typeof(ITodoRepository))
                   .InstancePerRequest();
            

            //Set the dependency resolver to be Autofac.  
            var container = builder.Build();

            return container;
        }
    }
}
