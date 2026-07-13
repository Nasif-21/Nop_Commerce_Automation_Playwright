import fs from 'fs';
import { UserModel } from '../model/usermodel';
import path from 'path';
import { Page } from '@playwright/test';


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
export function readJsonData(filepath:string):UserModel
{
    const fileContent=fs.readFileSync(filepath,'utf-8')
    const jsonArray=JSON.parse(fileContent)
    return jsonArray[jsonArray.length-1];

}

const tokenFilePath=path.resolve(__dirname,'../resources/localstorage.json');

export async function setAuth(page:Page)
{
    const cookie=JSON.parse(fs.readFileSync(tokenFilePath,'utf-8'))
    await page.context().addCookies([cookie]);

}

export async function getAuth(page:Page, cookieName:string)
{
    const cookies=await page.context().cookies();
    const cookie=cookies.find(c=>c.name===cookieName);
    fs.writeFileSync(tokenFilePath,JSON.stringify(cookie));

}
