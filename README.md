# js-share-server
Server implementation using OT infrastructure. Client built out of separate project but served using this infrastructure.

This provides basic infrastructure for authenticating, collaborating over a shared data model using OT, saving session state.

The server does not need to know application semantics but does need to support all the primitive data types used by the
application. Normally these are defined in the separate utility library as part of OTComposite infrastructure.
