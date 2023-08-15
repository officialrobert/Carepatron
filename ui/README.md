# Carepatron client's page UI

> This repository highlights two main features: `creating a new client` and enabling `full search`.
> While this isn't a full-blown high-production app, I will provide my insights on things to consider, dos and don'ts when handling a large number of item records.

## Demo


https://github.com/officialrobert/Carepatron/assets/49491660/de18850d-1fdc-4e5c-b850-293b9201e395


# Search

Normally, we should call an API endpoint to search the entire database and `debounce` this function on keypress or input.

```js
const debounced   = useDebounce(()=> // submit function
                    , 300) // delay in ms
```

At scale, list data must be `paginated`. While I could have used the same `'clients'` variable to store our filtered list, in production, it's essential to offer a snappy user experience when switching from filtered to unfiltered list.

While it's possible to use the same variable `'clients'` for both the filtered and unfiltered lists, this approach would necessitate querying our server every time we switch between the two states, which could potentially be resource-intensive and costly.

Note: The implementation of search functionality can vary significantly based on the app's technology stack. Possibilities include utilizing technologies like sockets, Firebase, Typesense, Algolia, among others.

# Creating a new client

It was written that all form inputs are required, so each input must be validate. For each input that fails, user will get an error message.



# How can you ensure the app behaves as you intend it to?
 
Unit testing can be helpful in this case. You can begin by checking the `App.test.tsx` file.

