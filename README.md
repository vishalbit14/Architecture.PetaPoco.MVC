# Architecture.PetaPoco.MVC
Project Architecture is designed to using the ASP.NET MVC 5.2.7, PetaPoco ORMs, can able to work with multiple databases, and also used the AngularJS v1.5.9 for the purpose of the model binding, use of the custom directives and filters for making an advanced web application.


**1. Architecture.Web** - Architecture.Web holds the Razor Views, Assets, SiteCss, SiteJs, and ViewJs. under the Viewjs added controllers, custom directives, filters, resources, and common js files. also can add component, services, and factories as per the requirements under Infrastructure. Currently, login, register, and userlist pages are working with validations using angular binding and I have added custom directive for the working with DatePicker, Select2, and Bootstrap-Select

**2. Architecture.Core** - Architecture.Core holds the business logic of the system and mapped to the Entity to ViewModel and sends the result to the Controllers to View and vice versa. Currently, the Core project holds Attributes, IDataPRovider, and DataProvider. You can add Attributes under the Core projects which is for the business logic and create Data Provider and Interface Data Provider for every controller. 
			
**3. Architecture.Data** - Architecture.Data holds the database logic and created the multiple common functions into the BaseDataProvider.cs which can be inherited from the PetaPoco methods and easy to use in multiple scenarios. Also, added Entity and Attributes which depend onto the database logics. The data project is the mediator of the database and business logic.

**4. Architecture.Generic** - Architecture.Generic holds all view models, common functions, helpers, enumerations, extensions, configs, constants, and resources.
