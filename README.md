# Coding Challenge For Knock

Based on gist for [Knock Backend Node Developer Questions](https://gist.github.com/particlebanana/4124568ddf18110376ed22d9cf378127).

## Questions

### What's something you have built or done that you are most proud of and why?

> One of the coolest things I built was a completely serverless system to consume users` data using AWS. Staring with API Gateway, then to several lambdas (linked together using step functions) and then ultimately stored on DynamoDB and PostgreSQL. This was fantastically interesting in the fact that my typical chore of being a systems admin was automated through the AWS infrastructure. This was also interesting as I began to see how many users this system could easily and concurrently handle (1000+ per second). I would say that this was a different way to think designing an architecture and has really challenged the way I think about systems now, although I see a lot of merit in the server-based architectures as well (sometimes they can make a lot more sense).

### What is a tech problem or area that you are excited about?

> I would definitely have to say that it would be something that would include machine learning. As I continue to finish up my degree as a data scientist, I am more and more intrigued about the idea of automating decisions to an intelligent computer program. I have already done a lot of stuff using Deep Learning and other "shallow" learning models as well. It definitely fascinates me. 

### Why Knock?

> Knock appears to be at the forefront of disrupting the antiquated business model of real estate. I think there's plenty more to be done. I see an extremely talented team of data scientists, engineers, and real estate people; I would be honored to learn from the team and contrbiute what I know as well.

## Coding Challenge

To run all the tests, run the following:

```
npm install
npm test
```

### Merge strings
A [simple function](src/helpers/merge-strings.js) was written to merge strings. A [test](test/merge-strings.js) was written to accompany the function.

### Transformation Function
A [function](src/helpers/normalize-data/normalize-property.js) is created to normalize any incoming mls data to a format that our API accepts. [Tests](test/normalize-home-record.js) have been created.

