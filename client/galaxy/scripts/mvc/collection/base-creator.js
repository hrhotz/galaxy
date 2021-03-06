define([
], function( ){

/* For presentation-related functionality shared across collection creators.
   Particularily overlapping functionality related to name processing and help.
*/
var CollectionCreatorMixin = {

    /** add (or clear if clear is truthy) a validation warning to the DOM element described in what */
    _validationWarning : function( what, clear ){
        var VALIDATION_CLASS = 'validation-warning';
        if( what === 'name' ){
            what = this.$( '.collection-name' ).add( this.$( '.collection-name-prompt' ) );
            this.$( '.collection-name' ).focus().select();
        }
        if( clear ){
            what = what || this.$( '.' + VALIDATION_CLASS );
            what.removeClass( VALIDATION_CLASS );
        } else {
            what.addClass( VALIDATION_CLASS );
        }
    },

    // ........................................................................ footer
    /** handle a collection name change */
    _changeName : function( ev ){
        this._validationWarning( 'name', !!this._getName() );
    },

    /** check for enter key press when in the collection name and submit */
    _nameCheckForEnter : function( ev ){
        if( ev.keyCode === 13 && !this.blocking ){
            this._clickCreate();
        }
    },

    /** get the current collection name */
    _getName : function(){
        return _.escape( this.$( '.collection-name' ).val() );
    },

    // ........................................................................ header
    /** expand help */
    _clickMoreHelp : function( ev ){
        ev.stopPropagation();
        this.$( '.main-help' ).addClass( 'expanded' );
        this.$( '.more-help' ).hide();
    },
    /** collapse help */
    _clickLessHelp : function( ev ){
        ev.stopPropagation();
        this.$( '.main-help' ).removeClass( 'expanded' );
        this.$( '.more-help' ).show();
    },
    /** toggle help */
    _toggleHelp : function( ev ){
        ev.stopPropagation();
        this.$( '.main-help' ).toggleClass( 'expanded' );
        this.$( '.more-help' ).toggle();
    },

    /** show an alert on the top of the interface containing message (alertClass is bootstrap's alert-*) */
    _showAlert : function( message, alertClass ){
        alertClass = alertClass || 'alert-danger';
        this.$( '.main-help' ).hide();
        this.$( '.header .alert' )
            .attr( 'class', 'alert alert-dismissable' ).addClass( alertClass ).show()
            .find( '.alert-message' ).html( message );
    },
    /** hide the alerts at the top */
    _hideAlert : function( message ){
        this.$( '.main-help' ).show();
        this.$( '.header .alert' ).hide();
    },

    _cancelCreate: function( ev ){
        if( typeof this.oncancel === 'function' ){
            this.oncancel.call( this );
        }
    },

    /** attempt to create the current collection */
    _clickCreate : function( ev ){
        var name = this._getName();
        if( !name ){
            this._validationWarning( 'name' );
        } else if( !this.blocking ){
            this.createList( name );
        }
    },

    _creatorTemplates: {
        main : _.template([
            '<div class="header flex-row no-flex"></div>',
            '<div class="middle flex-row flex-row-container"></div>',
            '<div class="footer flex-row no-flex"></div>'
        ].join('')),
    }

}

//==============================================================================
    return {
        CollectionCreatorMixin: CollectionCreatorMixin
    };
});
