/*** @jsx React.DOM */

var RouterMixin = {

  componentWillMount : function() {
    this.callback = (function() {
      this.forceUpdate();
    }).bind(this);

    this.props.router.on("route", this.callback);
  },

  componentWillUnmount : function() {
    this.props.router.off("route", this.callback);
  }
};

var ChapterComponent = React.createClass({

  mixins: [RouterMixin],

  getInitialState: function() {
    return {
      minimized: false
    }
  },

  handleBack: function(e) {
    e.stopPropagation();
    console.log("going to toc");
    this.props.router.navigate("toc", {
      trigger: true
    });
  },

  render: function() {

    var className = "animate-leave animate-leave-active";
    var activeClass = "chapter";
    
    if (this.props.router.current == this.props.chapter.href) {
      className = "animate-enter animate-enter-active";
      activeClass = "chapter active";
    }

    return (
      <div className={activeClass} id="chapter1">
        <img src={this.props.chapter.img} alt=""></img>
        <a onClick={this.handleBack} className="back" id="back-button">&lt; Back</a>
        <span className="title">
          {this.props.chapter.title}
        </span>
        <img className="page-link" src="img/right-arrow.png" alt="right arrow page link"></img>
      </div>
    );
  } 
});

var ShowcaseComponent = React.createClass({

  render: function() {
    return (
      <iframe id="showcase" frameBorder="0"></iframe>
    );
  }
});

var TocComponent = React.createClass({

  mixins : [RouterMixin],

  getInitialState: function() {

    return {
      minimized: false
    }
  },

  pickChapter : function(chapter) {
    this.setState({ minimized: true});
    this.props.router.navigate(chapter.href, {
      trigger : true
    });
  },

  render : function() {
    var router = this.props.router;
    var pickChapter = this.pickChapter;
    var chapterNodes = this.props.chapters.map(function(chapter) {
      return <ChapterComponent onClick={pickChapter(chapter)} chapter={chapter} key={chapter.href} ref={chapter.href} router={router} />;
    });
    return (
      <div>
        {chapterNodes}
      </div>
    );
  }
});

var AppComponent = React.createClass({

  mixins: [RouterMixin],
  render: function() {
    return (
      <div id="app">
        <TocComponent router={router} chapters={chapters}/>
        <ShowcaseComponent />
      </div>
    )
  }
});

var Router = Backbone.Router.extend({

  routes : {
    "toc"      : "toc",
    "chapter1" : "chapter1",
    "chapter2" : "chapter2",
    "chapter3" : "chapter3",
    "chapter4" : "chapter4",
    "chapter5" : "chapter5",
    "chapter6" : "chapter6",
    "chapter7" : "chapter7",
    "chapter8" : "chapter8",
  },

  toc: function() {
    this.current = "toc";
  },

  chapter1 : function() {
    this.current = "chapter1";
  },

  chapter2 : function() {
    this.current = "chapter2";
  },

  chapter3 : function() {
    this.current = "chapter3";
  },

  chapter4 : function() {
    this.current = "chapter4";
  },

  chapter5 : function() {
    this.current = "chapter5";
  },
});

var router = new Router();

var chapters = [
  {title: 'Where do trees grow and why?', href: 'chapter1', img: 'img/chapter1'},
  {title: 'What lives in the forest?', href: 'chapter2', img: 'img/chapter2'},
  {title: 'What shapes the forest?', href: 'chapter3', img: 'img/chapter3'},
  {title: 'How do we benefit from forests?', href: 'chapter4', img: 'img/chapter4'},
  {title: 'Our future forests', href: 'chapter5', img: 'img/chapter5'},
];

React.renderComponent(
  <AppComponent router={router} />,
  document.body
);

Backbone.history.start();

