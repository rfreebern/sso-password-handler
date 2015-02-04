= SSO Password Handler

Allows bulk-updating stored passwords for a given username on sites under a
given domain.

**WARNING** This is very naïve code with very little error-checking. Using it
could easily wipe out your stored passwords. You may want to back up the
`signons.sqlite` file in your Firefox profile directory regularly.

== Installation

Download `@sso-password-handler.xpi` and use `File` → `Open` to open it in
Firefox.

== Creating the XPI from source

# `git clone https://github.com/rfreebern/sso-password-handler.git`
# `sudo npm install -g jpm`
# `cd sso-password-handler`
# `jpm xpi`

== License

To the extent possible under law, Ryan Freebern has waived all copyright and
related or neighboring rights to this work. [CC0](http://creativecommons.org/publicdomain/zero/1.0/)
