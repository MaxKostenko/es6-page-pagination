mocha.setup('bdd');
var assert = chai.assert;

describe('Page count Test', function() {
    function pagesTest(rows, per_page, result) {
        it("For " + rows + " rows and " + per_page + " rows per page should be " + result + " pages", function() {
            assert.equal(Pagination.getPageCount( rows, per_page ), result );
        });
    }
    pagesTest(1, 7, 1);
    pagesTest(0, 7, 1);
    pagesTest(17, 7, 3);
    pagesTest(14, 7, 2);
    pagesTest(15, 7, 3);
    pagesTest(15, 6, 3);
    pagesTest(12, 6, 2);
    pagesTest(13, 6, 3);
    pagesTest(6, 6, 1);     
});

describe('Advenced List Test', function() {
    describe("Page count is variable", function() {
        let expected = [
            [1],
            [1,2],
            [1,2,3],
            [1,2,3,4],
            [1,2,3,4,5],
            [1,2,3,4,5,6],
            [1,2,3,4,5,6,7],
            [1,2,3,4,5,"...",8],
            [1,2,3,4,5,"...",9]
        ]

        function pageCountTest(x) {
            let pagination = new Pagination;
            pagination.pages = x;
            it("pages: " + x + " current: 1 labels limit: " + pagination.labels + " result: [" + expected[x-1] + "]", function() {
                assert.deepEqual(pagination.getAdvancedList(), expected[x-1]);
            });
        }
        for (var x = 1; x <= 9; x++) {
            pageCountTest(x);
        }
    });
    describe("Page current is variable", function() {
        let expected = [
            [1,2,3,4,5,"...",12],
            [1,2,3,4,5,"...",12],
            [1,2,3,4,5,"...",12],
            [1,2,3,4,5,6,"...",12],
            [1,2,3,4,5,6,7,"...",12],
            [1,"...",4,5,6,7,8,"...",12],
            [1,"...",5,6,7,8,9,"...",12],
            [1,"...",6,7,8,9,10,11,12],
            [1,"...",7,8,9,10,11,12],
            [1,"...",8,9,10,11,12],
            [1,"...",8,9,10,11,12],
            [1,"...",8,9,10,11,12]
        ]

        function pageCurrentTest(x) {
            let pagination = new Pagination( 12, x );
            it("pages: " + pagination.pages + " current: " + x + " labels limit: " + pagination.labels + " result: [" + expected[x-1] + "]", function() {
                assert.deepEqual(pagination.getAdvancedList(), expected[x-1]);
            });
        }
        for (var x = 1; x <= 12; x++) {
            pageCurrentTest(x);
        }
    });

    describe("Page current is variable, when label count is even", function() {
        let expected = [
            [1,2,3,4,5,6,"...",14],
            [1,2,3,4,5,6,"...",14],
            [1,2,3,4,5,6,"...",14],
            [1,2,3,4,5,6,"...",14],
            [1,2,3,4,5,6,7,"...",14],
            [1,2,3,4,5,6,7,8,"...",14],
            [1,"...",4,5,6,7,8,9,"...",14],
            [1,"...",5,6,7,8,9,10,"...",14],
            [1,"...",6,7,8,9,10,11,"...",14],
            [1,"...",7,8,9,10,11,12,13,14],
            [1,"...",8,9,10,11,12,13,14],
            [1,"...",9,10,11,12,13,14],
            [1,"...",9,10,11,12,13,14],
            [1,"...",9,10,11,12,13,14]
        ]

        function pageCurrentTest(x) {
            let pagination = new Pagination( 14, x, 6 );
            it("pages: " + pagination.pages + " current: " + x + " labels limit: " + pagination.labels + " result: [" + expected[x-1] + "]", function() {
                assert.deepEqual(pagination.getAdvancedList(), expected[x-1]);
            });
        }
        for (var x = 1; x <= 14; x++) {
            pageCurrentTest(x);
        }
    });

    describe("Label limit more than page count", function() {
        let expected = [1,2,3,4,5,6,7,8,9,10,11,12]

        function pageLimitTest(x) {
            let pagination = new Pagination( 12, x, 18 );
            it("pages: " + pagination.pages + " current: " + x + " labels limit: " + pagination.labels, function() {
                assert.deepEqual(pagination.getAdvancedList(), expected);
            });
        }
        for (var x = 7; x <= 9; x++) {
            pageLimitTest(x);
        }
    });
});
describe('Simple List Test', function() {

    describe("Page count is variable", function() {
        let expected = [
            [1],
            [1,2],
            [1,2,3],
            [1,2,3,4],
            [1,2,3,4,5],
            [1,2,3,4,5,6],
            [1,2,3,4,5,6,7],
            [1,2,3,4,5,6,7,8],
            [1,2,3,4,5,6,7,8]
        ]

        function pageCountTest(x) {
            let pagination = new Pagination;
            pagination.pages = x;
            pagination.labels = 8;
            it("pages: " + x + " current: 1 labels limit: " + pagination.labels + " result: [" + expected[x-1] + "]", function() {
                assert.deepEqual(pagination.getSimpleList(), expected[x-1]);
            });
        }
        for (var x = 1; x <= 9; x++) {
            pageCountTest(x);
        }
    });

    describe("Page current is variable", function() {
        let expected = [
            [1,2,3,4,5],
            [1,2,3,4,5],
            [1,2,3,4,5],
            [2,3,4,5,6],
            [3,4,5,6,7],
            [4,5,6,7,8],
            [5,6,7,8,9],
            [6,7,8,9,10],
            [7,8,9,10,11],
            [8,9,10,11,12],
            [8,9,10,11,12],
            [8,9,10,11,12]
        ]

        function pageCurrentTest(x) {
            let pagination = new Pagination( 12, x );
            it("pages: " + pagination.pages + " current: " + x + " labels limit: " + pagination.labels + " result: [" + expected[x-1] + "]", function() {
                assert.deepEqual(pagination.getSimpleList(), expected[x-1]);
            });
        }
        for (var x = 1; x <= 12; x++) {
            pageCurrentTest(x);
        }
    });


    describe("Labels limit more than page count", function() {
        let expected = [1,2,3,4,5,6,7,8,9,10,11,12]

        function pageLimitTest(x) {
            let pagination = new Pagination( 12, x, 18 );
            it("pages: " + pagination.pages + " current: " + x + " labels limit: " + pagination.labels, function() {
                assert.deepEqual(pagination.getSimpleList(), expected);
            });
        }
        for (var x = 7; x <= 9; x++) {
            pageLimitTest(x);
        }
    });

})
mocha.run();
