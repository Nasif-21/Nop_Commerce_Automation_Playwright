import fs from 'fs';


export function generateRandomNumber(min:number,max:number):number
{
    const randomNumber=Math.random()*(max-min)+min;
    return Math.floor(randomNumber)
    
}

// Write function to save data in Json file
export function saveJsonData(jsonObject:object , filepath:string):void
{
    const fileContent=fs.readFileSync(filepath,'utf-8');
    const jsonArray:object[]=JSON.parse(fileContent);
    jsonArray.push(jsonObject);
    fs.writeFileSync(filepath,JSON.stringify(jsonArray),'utf-8');

 
}

//read latest index from json file
export function readJsonData(filepath:string):object
{
    const fileContent=fs.readFileSync(filepath,'utf-8')
    const jsonArray:object[]=JSON.parse(fileContent)
    return jsonArray[jsonArray.length-1];

}
