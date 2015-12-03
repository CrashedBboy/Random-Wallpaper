describe('Test Function', function() {
		beforeEach(function() {
    });
    it('Test if the return value is valid url', function() {
				var json = {
					"result_count": 2,
					"images": [
						{
							"display_sizes": [{
								"is_watermarked": false,
								"uri": "http://cache4.asset-cache.net/xt/dv520008.jpg?v=1&g=fs1|0|DV|20|008&s=1&b=MkUw"
							}],
							"id": "dv520008",
							"title": "Autumn Leaves, New England, USA"
						},
						{
							"display_sizes": [{
								"is_watermarked": false,
								"uri": "http://cache4.asset-cache.net/xt/dv520008.jpg?v=1&g=fs1|0|DV|20|008&s=1&b=MkUw"
							}],
							"id": "dv520008",
							"title": "Autumn Leaves, New England, USA"
						}
					]
				};
				var url = getRandomURL(json).indexOf("http");
        assert.ok(url != -1, 'Should be valid url');
    });
});
