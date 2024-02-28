'use server'

import { NextResponse } from "next/server";
import puppeteer from 'puppeteer';

export default async function handleDownload(){

    try {
      // Fetch the HTML content from the API route
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Navigate to the page you want to capture
        await page.goto('http://localhost:3000/resources/calender?title=Legion Maria Church Liturgical Calender');

        // Get the HTML content of the page
        let htmlContent = await page.content();

        // Close the browser
        await browser.close();

        // Set the response headers
        // NextResponse.setHeader('Content-Disposition', 'attachment; filename=page.html');
        // NextResponse.setHeader('Content-Type', 'text/html');

        htmlContent=JSON.stringify(htmlContent)
        htmlContent=JSON.parse(htmlContent)

        // console.log(htmlContent);
        // Send the HTML content as the response
        return htmlContent;
    } catch (error) {
      console.error('Error downloading HTML:', error);
    }
};