import '@babel/polyfill';
import path from 'path';
import chai, { expect } from 'chai';
import chaiMatch from 'chai-match';
import axios from 'axios';
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import { fork } from 'child_process';
import sleep from 'sleep';

chai.use(chaiMatch);

const PORT = 5000;
const BASE_URL = `http://localhost:${PORT}`;
const PAGE_ROOT_SELECTOR = '.root-page';
const HEADLESS = true; /* change to false in demonstration mode */
const SLEEP_DELAY = 1;

let browser, page, appProcess;

describe('Routing system', () => {
    before(async () => {
        appProcess = fork(path.resolve(__dirname, '..', '..', 'server', 'server-prod.js'));

        await new Promise((resolve) => {
            appProcess.on('message', (message) => {
                if(message === 'online') resolve();
            });
        })

        browser = await puppeteer.launch({
            headless: HEADLESS,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ]
        });
        page = await browser.newPage();
    });

    it('should run appProcess', async () => {
        expect(appProcess).to.be.ok;
    });

    it('should open main page', async () => {
        await page.goto(`${BASE_URL}/`);
        await page
            .waitForSelector(PAGE_ROOT_SELECTOR, {visible: true})
            .then(async () => {
                const html = await page.content();

                const $ = cheerio.load(html, { decodeEntities: false });
                const elements = $(PAGE_ROOT_SELECTOR);

                if(elements[0]) {
                    const text = $(elements[0]).text();
                    expect(text).to.match(/Project Tracker - Main page/);
                    if(!HEADLESS) sleep.sleep(SLEEP_DELAY);
                } else {
                    console.log(`Not found selector: ${PAGE_ROOT_SELECTOR}`);
                }
            })
            .catch(error => {
                console.log('ERR:', error);
            })
    });

    it('should render project page', async () => {
        const id = 1;
        const response = await axios.get(`${BASE_URL}/api/v2/projects/${id}`);
        const project = response.data;

        await page.goto(`${BASE_URL}/projects/list/${id}`);
        await page
            .waitForSelector('.card-header', {visible: true})
            .then(async (element) => {
                const text = await page.evaluate(element => element.textContent, element);
                expect(text).to.equal(project.name);
            })
            .catch(error => {
                console.log('ERR:', error);
            })
    });

    it('should render user name in table on users page', async () => {
        const response = await axios.get(`${BASE_URL}/api/v2/users?from=1&to=5`);
        const users = response.data;

        await page.goto(`${BASE_URL}/users`);
        await page
            .waitForSelector('.b-table', {visible: true})
            .then(async (element) => {
                const firstRowNameCellTextContent = await page.evaluate(element => {
                    const rowsCollection  = element.getElementsByTagName('tr');
                    const cellsCollection = rowsCollection.length && rowsCollection[1]
                        ? rowsCollection[1].getElementsByTagName('td') : [];
                    return cellsCollection.length && cellsCollection[0]
                        ? cellsCollection[0].textContent : '';
                }, element);

                expect(firstRowNameCellTextContent).to.equal(users[0].name);
            })
            .catch(error => {
                console.log('ERR:', error);
            })
    });

    after(async () => {
        await page.close();
        await browser.close();
        appProcess.send('shutdown');
        process.exit();
    });
});

/*
(function getUserName(element){
    const rowsCollection  = element.getElementsByTagName('tr');
    const cellsCollection = rowsCollection.length && rowsCollection[1]
        ? rowsCollection[1].getElementsByTagName('td') : [];
    return cellsCollection.length && cellsCollection[0]
        ? cellsCollection[0].textContent : '';
})(document.querySelector('.b-table'));
*/
