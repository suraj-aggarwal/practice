import {Request, Response, NextFunction} from 'express';

const validateTrainee = function (config) {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log('-----------validateTrainee----------',);
        const parameters: string[] = Object.keys(config);
        console.log('-----------parameters------------',parameters);
        const errorLogs: string[] = [];
        parameters.forEach( parametr => {
            const validaters: string[] = Object.keys(config[parametr]);
            console.log('------------validaters---------',validaters);
            const isRequiredAvaliable = validaters.includes('required');
            const isErrorMessageAvaliable = validaters.includes('errorMessage');
            const isNumberAvaliable = validaters.includes('number');
            const isStringAvaliable = validaters.includes('string');
            const isObjectAvaliable = validaters.includes('isObject');
            const isDefaultAvaliable = validaters.includes('default');
            const isRegexAvaliable = validaters.includes('regex');
            const isCustomAvaliable = validaters.includes('custom');
            const isInAvaliable = validaters.includes('in');
            
            const isRequired: boolean  =  (isRequiredAvaliable) ? config[parametr]['required'] : isRequiredAvaliable;
            const errorMessage: string = (isErrorMessageAvaliable) ? config[parametr]['errorMessgae'] : undefined;
            const isNumber : boolean = (isNumberAvaliable) ? config[parametr]['number'] : isNumberAvaliable;
            const isString: boolean = (isStringAvaliable) ? config[parametr]['string'] : isStringAvaliable;
            const isObject: boolean = (isObjectAvaliable) ? config[parametr]['isObject'] : isObjectAvaliable;
            const constant: number = (isDefaultAvaliable) ? config[parametr]['default'] : undefined;
            const regex: RegExp = (isRegexAvaliable) ? config[parametr]['regex']: undefined;
            const custom: any = (isCustomAvaliable) ? config[parametr]['custom'] : undefined;
            const input: string = (isInAvaliable) ? config[parametr]['in'] : undefined;
            console.log('--------INPUT---------',input);
            
            

            if(input !== undefined) {
                const clientInputFields: string[] = Object.keys(req[input]);
                console.log('------------clientInputFields-------------',clientInputFields);
                const isFieldExits: boolean = clientInputFields.includes(parametr);
                console.log('----isFieldExits---------',isFieldExits,'----------parameter----------',parametr);
                if(!isFieldExits && isRequired) {
                    errorLogs.push(`${parametr} is Required`);
                }

                if(isFieldExits) {
                    const value: string = req[input][parametr];
                    const type: string = typeof value;
                    if(isString && type !== 'string') {
                        errorLogs.push(`${parametr} String type is Required`);
                    }else  if(isNumber && type !== 'number') {
                        errorLogs.push(`${parametr} Number type is Required`);
                    }else if(isObject && type !== 'object') {
                        errorLogs.push(`${parametr} object type is Required`);
                    }
                }

                if(isFieldExits && custom !== undefined) {
                    console.log('custom');
                }

                if(isFieldExits && constant !== undefined && (req[input][parametr] == undefined || req[input][parametr] == null)) {
                    req[input][parametr] = constant;
                }

                if(isFieldExits && regex !== undefined && !regex.test(req[input][parametr]) && errorMessage !== undefined) {
                    errorLogs.push(errorMessage);
                }
            }
            
            console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        });
        console.log(errorLogs);
        next();
    }
}

export default validateTrainee;