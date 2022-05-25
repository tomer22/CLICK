// ActorList represents a list of (unique) actors
// Used by the game loop to manage all actors

class ActorList {
    actors : Actor[];

    constructor(){
        this.actors = [];
    }

    /**
     * Add actor to list (if not already included)
     * @param actor 
     */
    addActor(actor : Actor) : void {
        if (! this.actors.includes(actor)){
            this.actors.push(actor);
        }
    }

    /**
     * Add multiple actors to list (if not already included)
     * @param actors 
     */
     addAllActors(actors : Actor[]) : void {
        for (const actor of actors){
            this.addActor(actor);
        }

    }
    
    /**
     * Use to safely remove an actor from the list.
     * Do NOT use this in a loop over this list's actors - instead, call removeAllActors.
     * @param actor 
     */    
    removeActor( actor : Actor) : void {
        let index : number = this.actors.indexOf(actor);
        if (index > -1)
            this.actors.splice(index, 1);
    }

    /**
     * Use to safely remove multiple actors from the list.
     * If not passed an array of actors to remove, removes all actors in this list.
     * @param actors
     */    
    removeAllActors( actors : Actor[] = this.actors) : void {
        if (actors === this.actors){
            this.actors = [];
            return;
        }
        for (const actor of actors){
            this.removeActor(actor);
        }
    }
}