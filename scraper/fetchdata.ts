import cheerio from 'cheerio';
import axios from 'axios';
const keys = require('../config/keys.js');

import { FetchInterface } from '../interfaces/FetchInterface';
import { IssueInterface } from '../interfaces/IssueInterface';

export const fetchData = async (
  url: string,
  weekOf: string,
  interation: number
): Promise<FetchInterface> => {
  console.log('urls', url);
  const result = await axios.get(url);
  const $ = cheerio.load(result.data);
  weekOf = $('title').text().replace('Comic Book New Releases ', '');
  if (weekOf.length > 0) {
    weekOf += ', ' + new Date().getFullYear();
  }
  const nextNode = $('li[class="next"]');
  let nextUrl: string = '';

  if (nextNode != null) {
    let nextLink = nextNode.children().first().attr('href');
    if (nextLink) {
      nextUrl = `${keys.scraperFromUrl}${nextLink}`;
    }
  }

  let lastTitle = null;
  let lastPublisher = null;
  let lastTitleID = 0;
  let lastPublisherID = 0;

  let issues: IssueInterface[] = [];

  $('li[class="issue"]').each((index: number, node: cheerio.Element) => {
    var $node = $(node);
    var imageUrl = $node.find('.fancyboxthis').attr('href');
    const imageUrlValue = imageUrl ? imageUrl : '';
    var titleChildren = $node.find('.title').children();
    var title = titleChildren.first().text();
    const titleValue = title;
    var titleId = titleChildren.first().attr('href');
    const titleIdValue = titleId
      ? titleId.substr(titleId.indexOf('TID=') + 4)
      : '';

    var issueNumber = titleChildren.first().siblings().first().text();
    const issueNumberValue = issueNumber;

    var publisherNode = $node.find('.othercolright');
    var publisher = publisherNode.children().last().text();
    const publisherValue = publisher;

    var pubDate = publisherNode.children('a').first().text();
    const pubDateValue = weekOf ? weekOf : pubDate;

    var description = $node.find('.issuegrades').siblings().first().text();
    var description2 = $node.find('.issuegrades').siblings().nextAll().text();
    if (description2) {
      description += description2;
    }

    const descriptionValue = description;

    var price = '';
    var newPrice = 'false';
    var priceValue = 0.0;
    if (description.lastIndexOf('Cover price $') >= 0) {
      price = description.substring(
        description.lastIndexOf('Cover price $') + 13
      );
      newPrice = price.substr(0, price.indexOf('.') + 3);
      priceValue = newPrice ? (newPrice as unknown as number) : 0.0;
    }

    issues.push({
      imageUrlValue,
      titleValue,
      issueNumberValue,
      publisherValue,
      pubDateValue,
      descriptionValue,
      priceValue,
      titleIdValue,
    });
  });

  console.log(url, issues.length);

  return { nextUrl, weekOf, issues };
};
