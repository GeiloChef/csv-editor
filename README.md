# Vue 3 CSV Editor

This Editor lets you easily edit your CSV and export it when you're done editing.
No Data is uploaded to any server, everything is handled locally. 

>Please make sure your CSV is fitting the RFC 4180 common format!

## Where can I now edit my CSV File?

You can either make use of the deployed version on GitHub pages, or you deploy it yourself!

## About the Application

It's written in Vue 3 with typescript. Everything you do is handled locally. The CSV will be
locally processed during the import. 

## What dependencies does it take?

As you can also check in the `package.json` I used the following dependencies to develop 
this editor:
 - FontAwesome Icons (For icons obviously )
 - Pinia (To have the processed data in a central place)
 - VueUse Core (For keeping the Pinia Store in the local storage)
 - PrimeVue (Because it has really awesome components)
 - uuid (I'll let you guess why...)

