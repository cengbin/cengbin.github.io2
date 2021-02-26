function Carousel ($element, options) {
  var _this = this;

  this.options = options
  this.sliding = null
  this.interval = null

  this.$active = null
  this.$items = null
  this.$element = $element
  this.$indicators = this.$element.find('.carousel-indicators li')
  this.$indicators.click(function () {
    _this.to($(this).index())
  })

  if (this.options.interval)
    this.cycle()

  // console.log(this)
}

Carousel.prototype = {
  cycle: function (e) {

    this.interval && clearInterval(this.interval)

    this.options.interval && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  },
  getItemIndex: function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  },
  getItemForDirection: function (direction, $active) {
    var activeIndex = this.getItemIndex($active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
      || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return $active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  },
  to: function (pos) {
    var that = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding) return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  },
  pause: function (e) {
    if (this.$element.find('.next, .prev').length) {
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  },
  next: function () {
    console.log('next sliding', this.sliding)
    if (this.sliding) return
    return this.slide('next')
  },
  prev: function () {
    if (this.sliding) return
    return this.slide('prev')
  },
  slide: function (type, next) {
    var that = this
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'

    var $active = this.$element.find('.item.active')
    var $next = next || this.getItemForDirection(type, $active)

    if ($next.hasClass('active')) return (this.sliding = false)

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.removeClass('active').eq(this.getItemIndex($next)).addClass('active')
    }

    if (this.options.slide) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)

      setTimeout(function () {
        $next.removeClass([type, direction].join(' ')).addClass('active')
        $active.removeClass(['active', direction].join(' '))
        that.sliding = false

      }, that.options.duration)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
    }

    isCycling && this.cycle()

    return this
  }
}

Carousel.DEFAULTS = {
  interval: 1000, // 自动切换间隔时间，不想自动切换设置false
  slide: true,// 是否支持切换动画
  duration: 600, // 切换的动画持续时间
  wrap: true, // 是否连续循环
}

$.fn.carousel = function (option) {
  return this.each(function () {
    var $this = $(this)

    var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
    var carousel = new Carousel($this, options)

    $this.data('plugin.carousel', carousel)
    // console.log($this)
  })
}