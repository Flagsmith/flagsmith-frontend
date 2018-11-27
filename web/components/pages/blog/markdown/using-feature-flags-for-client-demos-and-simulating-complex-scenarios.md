
# Using feature flags for client demos and simulating complex scenarios

Since making the jump to developing all of our new production mobile/web apps with Bullet Train for feature flags, one of the latest benefits I’ve come to realise is being able to toggle your app to simulate tedious and complicated scenarios.

## The problem: wasting time replicating app scenarios

I know myself a developer have often spent hours replicating issues or developing a new feature that requires the app to be in a certain state. For example, improving onboarding that would require me to signup to my site with around a million Mailinator emails.

This pain point is perhaps the main reason we also employ end to end automated tests on the frontend using [Nightwatch JS](http://nightwatchjs.org/).

## The solution: develop your app “simulation first”

Developing new projects with feature flags in mind changed the way I thought about implementing new features. Now, whenever a new feature gets developed I have to make the application flexible enough to behave well with and without it. With Bullet Train I then have a really easy way to simulate that feature being on and off or change the settings.

![](https://cdn-images-1.medium.com/max/2000/0*uyi24dBayoE_LikC.png)

This idea resulted in me questioning, what if I could toggle scenarios rather than just features? Now alongside a feature, I create simulation flags that when enabled, fabricate data and conditions that force my application into a certain state.

![](https://cdn-images-1.medium.com/max/2000/0*hYvTh_XXmZ7V7due.png)

Perhaps the biggest gain I saw from this recently was in a client facing meeting, I was able to reel off a number of edge case scenarios and show exactly how the app would react. Previously this process would have been a lot less fluid, being able to quickly demonstrate the scenario meant that the client was able to immediately see and feedback without losing train of thought.

## A practical example

Rather than waffle on at a high level about how much I enjoy the idea, here’s an end to end example of how I added the ability to simulate loads of data in one of our more recent projects. This helps us test both UI performance and how it handles UI wrapping onto new lines.

![](https://cdn-images-1.medium.com/max/2000/0*9zSh84aBZwGeL2D2.gif)

This GIF shows me changing the value of a “data_multiplier” feature remotely, then when I open my app it will act as if the API gave me x times the number of items.

Here’s how I achieved this:

## Step 1 — Initialise bullet-train

I created a project at [https://bullet-train.io,](https://bullet-train.io/?utm_source=medium&utm_medium=social) and copied and pasted the JavaScript snippet.

    npm i bullet-train-client --save; //or react-native-bullet-train in my case

    import bulletTrain from 'bullet-train-client'; //or react-native-bullet-train in my case bulletTrain.init({ environmentID: Project.bulletTrain, onChange: controller.loaded });

## Step 2 — Create the simulation feature

In my project, I created a feature called “data_multiplier” and set its initial value to 0. Whenever I get a list of projects from the API in my mobile application I check for this flag and if it has a value I just duplicate the data.

    if (bulletTrain.getValue("data_multiplier")) { _.map(_.times(bulletTrain.getValue("data_multiplier") - 1), (i) => { projects = projects.concat(res.map((item) => { return Object.assign({}, item, { id: item.id + "" + i, key: item.key + i, name: item.name + " Copy " + i }) })); }); }

This idea will obviously depend on what frameworks you’re using, but I’ve found it’s best to implement this idea at the point where the app receives data.

## Use cases

Developing this way predominantly saves time in testing and future development by making your applications really flexible. In my opinion, this should be implemented in any scenario that you find cumbersome to replicate so will obviously depend on the business logic of your application.

Having said that here are a few common use cases I’ve started to simulate in new projects:

* A “new user” on login to always show onboarding

* The browser or device being offline

* Device support (e.g. no GPS)

* Enabling / disabling ads

Let me know if you employ a similar approach on your projects and how useful you’ve found it.

Happy Developing!

![](https://cdn-images-1.medium.com/max/2000/0*TdfyuJ0Oee5idyNs.png)

*Originally published at [dev.to](https://dev.to/kylessg/using-feature-flags-for-client-demos-and-simulating-complex-scenarios-1gih).*
