const employeeModel = require('../db/employee');
const RequrestError = require('../util/requestError');

exports.postEmployee = (req, resp, next)=>{
    const employee = req.body || {};
    const epModel = new employeeModel();
    epModel.firstName = employee.firstName;
    epModel.lastName = employee.lastName;
    epModel.participation = employee.participation;
    epModel.save().then(savedEmployee =>{
        resp.status(200)
        .json(savedEmployee);
    }).catch(error => {
        let errorMessage = new RequrestError();
        if(error.name == 'ValidationError'){
            errorMessage.status = 400;
            errorMessage.name = "Erro de validação";
            errorMessage.message ="Por favor, informe todos os campos da API";
            next(errorMessage);
        }else{
            next(error);
        }
    });
    
}

exports.getEmployees = (req, resp, next)=>{
    employeeModel.find({})
    .then(employees =>{
        const totalParticipation = employees.reduce((total, ep)=>{
            return total + ep.participation || 0;
        }, 0);
        const percent = 100.0 / totalParticipation;
        
        //calcula a porcentagem de cada empregado
        employees = employees.map(employee => Object.assign({},employee.toJSON(),{participation: employee.participation * percent}));

        resp.status(200)
        .json(employees);

    }).catch(error => {
        next(error);
    });
}


