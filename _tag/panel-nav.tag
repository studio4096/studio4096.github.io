<panel-nav>
  <ul class="fa-ul { opts.listClass }">
    <li each={ items } data-layout-name="{ layoutClass }" onclick="{ changeLayout }" no-reorder>
      <span class="fa { iconClass }"></span>
    </li>
  </ul>
  <h1><a href="{ opts.navTitleLink }">{ opts.navTitle }</a></h1>
  <script>
      this.items = opts.items;
      this.changeLayout = opts.changeLayout;
  </script>
  <style scoped>
  :scope {
      display: block;
  }
  :scope ul {
      margin-left: 1em;
      float: left;
  }
  :scope li {
      display: inline-block;
  }
  :scope h1 {
      float: right;
  }
  </style>
</panel-nav>
