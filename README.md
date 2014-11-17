asyncStorage
============

Asynchronous version of the localStorage API, backed by * an IndexedDB database.

This file defines an asynchronous version of the localStorage API, backed by an IndexedDB database. It creates a global
asyncStorage object that has methods like the localStorage object.

Usage
==========

To store a value use setItem:

<code javascript>
asyncStorage.setItem('key', 'value');
</code>

If you want confirmation that the value has been stored, pass a callback function as third argument:

<code javascript>
asyncStorage.setItem('key', 'newValue', function() {
    console.log('new value stored');
});
</code>

To read a value, call getItem(), but note that you must supply a callback function that the value will be passed asynchronously:

<code javascript>
asyncStorage.getItem('key', function(value){
    console.log('The value of key is:', value);
});
</code>

Note that unlike localStorage, asyncStorage does not allow you to store and retrieve values by setting and querying 
properties directly. You cannot just write asyncStorage.key; you have to explicity call setItem() or getItem().

removeItem(), clear(), length(), and key() are like the same-named methods of localStorage, but, like getItem() and
setItem() they take a callback argument.

The asynchronous nature of getItem() makes it tricky to retrieve multiple values. But unlike localStorage, asyncStorage
does not require the values you store to be strings. So if you need to save multiple values and want to retrieve them
together, in a single asynchronous operation, just group the values in a single object. The properties of this object
may not include DOM elements, but they may include things like Blobs and typed arrays.

Testing
====
