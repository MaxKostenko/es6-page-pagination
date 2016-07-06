class Pagination {

    constructor( pages = 1, current = 1, labels = 5 ) {
        this.pages = pages; //has getter/setter
        this.current = current; //has getter/setter
        this.labels = parseInt( labels ); //has getter/setter
    }

    static getPageCount( rows, per_page = 25 ) {
        let page_count = 1;
        if( rows ) {
            page_count = parseInt( rows/per_page );
            if( rows%per_page ) {
            	page_count++;
            }
        }
        return page_count;
    }

    getSimpleList() {
        let arr = [];
        let start = Math.min( this.current - Math.floor( this.labels/2 ), this.pages - this.labels + 1 );
        start = Math.max( 1, start );
        let finish = start + Math.min( this.labels, this.pages );
        for( let i = start; i < finish; i++ ) {
            arr.push(i);
        }
        return arr;
    }

    getAdvancedList() {
        let arr = [];
        let start = 1;
        let left_offset = Math.floor( this.labels/2 );
        let right_offset = this.labels - left_offset -1;
        let labels_length = this.labels;
        arr.push(1);
        start = this.current - left_offset;
        if( this.current > left_offset + 3 ) {
            arr.push('...');
        } else {
            start--;
            if( this.current > left_offset + 1 )
                labels_length += this.current - left_offset - 2;
            else
                labels_length--;
        }
        start = Math.max( 2, start );

        let finish = Math.min( this.pages, start + labels_length );
        if( finish + 1 == this.pages ) {
            finish++;
        }
        start = Math.max( 2, Math.min( start, finish - labels_length + 1 ) );
        for( let i = start; i < finish; i++ ) {
            arr.push(i);
        }
        if( ( this.labels + 2 < this.pages ) && ( this.current < this.pages - right_offset - 2 ) ) {
            arr.push('...');
        }
        if(this.pages > 1)
            arr.push(this.pages);
        return arr;
    }

    set current( value ) {
        this[Symbol.for('current')] = Math.min( this.pages, parseInt( value ) );
    }

    get current() {
        return this[Symbol.for('current')];
    }

    set pages( value ) {
        this[Symbol.for('pages')] = parseInt( value );
        if( this.current > value ) {
            this.current = value;
        }
    }

    get pages() {
        return this[Symbol.for('pages')];
    }

    set labels( value ) {
        if( value < 3 ) value = 3;
        this[Symbol.for('labels')] = parseInt( value );
    }

    get labels() {
        return this[Symbol.for('labels')];
    }
}
