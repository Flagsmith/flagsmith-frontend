
# 7 Reasons for Devs To Use Feature Flags As A Growth Hack

No way is a dev giving any non-coder access to their code. That is exactly how shit gets broken. But also, your marketing guys have time-consuming tweaks and requests which they need in order to do their jobs of keeping the lights on.

Feature flags are the happy compromise. Developers can hand control to growth hacker to do what they want while isolating any repercussions - so there’s no way the marketer can break everything, and the dev gets their time back to focus on actually building the product.

![Fun With Flags](https://cdn-images-1.medium.com/max/12032/1*o53AvcSOYXaH53DpJE7F5g.jpeg)*Fun With Flags*

So what are the benefits to flags for a marketer? Why should a dev bother setting them up? Here we delve into 7 use cases for feature flags in marketing and business growth strategy, so everyone can get what they need.

## The marketing use cases for feature flags, all focused on business growth.

(Plus fundamentally we believe that feature flags aren’t just a nice-to-have to sate demanding marketers, rather *anyone involved with user-facing features, who needs to know when and how users interact with a product, needs to consider feature flags*. It fuels how you plan, how you test, how you iterate, how you optimise. That’s growth hacking. After all, if you’re in a startup, you’re all involved in customer development. Feature flags give that scope.)

Here’s the first use case, client demos. Also coming up, canary releases, upsell opportunities, and A/B tests:

## Client Or Investor Demos

You’re in the client’s office. The app’s a demo-able beta and you’re seeking approval and feedback from stakeholders. Feature flags will help your pitching team demonstrate alternative scenarios, edge cases, the impact of a feature request et al., because the features you’ve built with continuous integration can be toggled on and off without affecting anything else.

We know this works because we’ve done it ourselves. In a client meeting, we showed the edge case scenarios applicable to the app without further tedious coding and the client was able to give cogent feedback and not deal in hypotheticals.

Here’s how we built the feature flags for that demo: [https://medium.com/@GetBulletTrain/using-feature-flags-for-client-demos-and-simulating-complex-scenarios-93dda4a3d1e4](https://medium.com/@GetBulletTrain/using-feature-flags-for-client-demos-and-simulating-complex-scenarios-93dda4a3d1e4)

## Canary Releases

Feature flags work really well for canary releases, they’re giant safety valves.

Canary releases are also known as a percentage rollout. A canary release is when you push new features to small numbers of users at a time to test the app’s performance. Once one batch has released just fine, you know you can move to pushing to a bigger batch and so on and so on. The first users are the canaries and of course, if they fall off their perch, you know for sure that you need to use the kill switch on the feature flag to stop the damage right there.

It’s not just app damage here, it’s reputation, user experience, everything. You gotta give marketers and customer success guys a chance to manage the blowback. IDK if Snapchat could have used canary launches more to avoid Kylie Jenner wiping $1.3billion off Snapchat’s value with a single tweet, but who knows.

## Fatten The Worm For The Early Birds

Further to the benefits to a canary launch above, using feature flags to roll out new features to a very restricted initial subset of users can actually be a valuable marketing tactic.

![A chubby boi with worm to illustrate my point](https://cdn-images-1.medium.com/max/3840/1*vpeh3SNahVeRtndmmJjbjQ.jpeg)*A chubby boi with worm to illustrate my point*

The exclusivity drives FOMO amongst the excluded while making the chosen few feel extra special and warm inside. Those happy campers are often your top users, premium subscribers and so on, and this tactic can strengthen their loyalty and your bank account.

The beauty of flags here is that if you give the feature flag to the customer success team, they can switch the feature on when it is most strategic *for them.* The devs don’t have to drop what they’re doing and help out when it’s convenient for everyone else but them because the feature flag separates deployment from release.
> I can’t stress how freeing it is to separate deployment from release, to remove the time pressure of releasing to another team’s deadline.

Think of the meetings you **won’t** have to have around coordinating feature releases with the growth team!!! They can handle it allll themselves!

And marketers, just think what this enables you to do. Now you’re not relying on the tech team to give you the go ahead, you can take full control of the communications around the new feature, you can seamlessly combine the feature with your email marketing, your flash offers, time-limited benefits, whatever the hell you want and you don’t have to bother the overworked tech team about it once.

## But… The Second Mouse Gets The Cheese

Also, know thy audience. If your users are busy office workers using enterprise software, they will haaaate changes in the user experience. They just want to be left alone in their nice comfort zone.

Feature flags’ ability to allow you to choose who gets your new features works both ways, it also means you choose who *doesn’t* get the new features. So you can test thoroughly in production on a few brave souls, before rolling out your now optimised code to the rest of them. It means you can save the bulk of users the hassle of the inevitable iterations and optimisations and fine-tuning which come with new releases which come up against real unpredictable humans. You can see the benefit in that.

So marketers, just like before where you could now control the timing of the releases to combine them with comms to the new users, so you can manage the education comms around the new software to brace the end-users for what’s coming. Prevention is better than the cure my friends, feature flags mean you can plan that prevention well in advance.

## Feature Flags To Grow Brand Loyalty

As we said earlier, in a startup, anyone involved with customer features needs to fully participate in customer development, which culminates in Building Brand Loyalty or Improving Retention.

So, the CTO as much as the CMO needs to be involved in the long term brand loyalty of the product and make decisions accordingly. With the power to improve brand loyalty, so too come the responsibility

It seems obvious, but this approach changes the conversation from “how do we do this cheaper or more stable or whatever”, to “how does this engender loyalty?”

The standard example is if your app is one which depends on instant gratification, ordering pizza or giving the name of a plant, then your users will abandon you in seconds if it is glitches in any way. Devs would be directly responsible for building brand loyalty by making sure that didn’t happen.

Feature flags come in at this point, because they’re part of continuous integration. CI means that you should have reduced bugs while producing a smoother experience — ideal for pizza ordering apps.

Users nowadays expect gradual and continual improvements to their experience, not big bulky releases. Now, *the **way** in which companies release updates to optimise user experience is also a part of that user experience* — just like responsive design or conversational UI. Users judge you on how you improve — and a CTO with their eye on the ball wants to exceed their expectations.

## Feature Flags To Manage User Segments

This is the real sexy stuff.

Feature flags mean you can alter the behaviour of your app to certain user segments.

Think of the decisions you can make with that power! Think of the A/B tests you can run! Maybe you push a feature to users only in Newcastle, or push to the users who’ve de-activated and need a strong reason to re-engage, or test longer form content on Sundays and opposed to short form on Friday evenings.

So, marketers can run their bespoke and repeated tests and not need to involve the devs in great detail. It removes the planning of tests from the devs’ desks, it removes the responsibility for tracking and analysing and reports compiling, it all means you the dev can spend time building, not tweaking.

There’s another massive benefit here too. It’s not just experiments you can now run on your segmented users. It’s a valuable upsell opportunity.

You can use feature flags in various ways to upsell, we’ve already mentioned using flags in a client demo to show how an app in development might evolve, but also feature flags can be used to upsell — to show a client in situ the increased usability the next paid tier can unleash for them. It’s the physical demo right there and then which sparks their interest. It’s “you can try out this baby for size right now”, not a hypothetical “it can do this and this I promise, take my word for it, here’s a list of features in jargonese”.

Or, give them a sneak peek for the next big thing you’re working on, a valuable tool for sales guys to convince a client to stick with you by trailing the rosy future you’ve got planned. Client management is as much about demonstrating a shared journey as delivering a current project, feature flags can make that journey tangible.

## Feature Flags And Sunsetting

You can launch features with feature flags, you can also retire them. It’s called “sunsetting”.

The closing down of a feature needs to be done well and according to process, so that it doesn’t cause problems down the line. When you look at the worst cases of feature flags used wrongly, a dev not correctly sunsetting a flag can have disastrous consequences. In [When Feature Flags Go Wrong](https://medium.com/@GetBulletTrain/when-feature-flags-go-wrong-e929144d589a) we show what happens when you don’t properly delete a flag from eight years previously. To one financial firm, it meant just 45 minutes of hell killed their company. 45 minutes!

To prevent poor sunsetting, you can build your own dashboard to give you visibility over what’s in use, as well as the dashboard marketers can use to play around with the flags. However there are also products out there which can save you the bother, because they do it for you much more quickly, such as [Bullet Train](https://bullet-train.io/?utm_source=medium) (us) or [LaunchDarkly](https://launchdarkly.com) (more geared towards enterprise than SMEs).

![A nice sunset to enjoy.](https://cdn-images-1.medium.com/max/10694/1*VhVWt69jxYBXVKujsTs2aw.jpeg)*A nice sunset to enjoy.*

*So, there you have it, the 7 use cases for using feature flags to grow your business by engendering user loyalty, schmoozing clients, understanding user behaviour, and seeing new deploys as a marketing opportunity.*

*For more info on feature flags, here’s a [beginner’s guide](https://bullet-train.io/blog/remote-config-and-feature-flags?utm_source=medium), or follow us as we share more tips on continuous integration, app development, and feature flaaaaaaags.*
