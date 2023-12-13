<%- include('../partials/header') %>

<script>
    let outputMonth
function filterMonth() {
    const selectElement = document.querySelector('.monthFilter');
    if (selectElement.value !== 'all') {
        outputMonth = selectElement.value;
    }

    console.log(outputMonth);
}
</script>

<!-- <script defer src="../../public/javascripts/webApp.js"></script> -->
<h1>Income Management Dashboard</h1>
<h2><%= user.name%></h2>
</br>
<!-- filter month -->
<div>
    <select class='monthFilter'>
        <option value='all'>ALL</option>
        <%- months.map(m =>
        `<option value="${m}">${m.toUpperCase()}</option>`).join('')%>
    </select>
    <!-- add button to call the dom function onclick refer to js script in webApp.js-->
    <button type="button" onclick="filterMonth()">Filter</button>
</div>



</br>
<div class='income'>
    <h2>Income Details</h2>
<table id='income'>
    <thead>
        <tr>
            <th>Date</th>
            <th>Source</th>
            <th>Amount</th>
            <th>Note</th>
        </tr>
    </thead>
    <tbody>
        <% let totalIncome = 0 %>
        <%income.forEach((i) => {%>
        <!-- check if outputMonth === ALL -->
        <!-- get the total amount sum -->
        <% totalIncome += i.amount %>
        <tr>
            <!-- formate Date Object -->
            <% date= i.date.getDate().toString().padStart(2, '0') + '-' + (i.date.getMonth() + 1).toString().padStart(2, '0') + '-'+ i.date.getFullYear()%>
            <td><%= date %></td>
            <td><%=i.source%></td>
            <!-- convert the amount to currency THB -->
            <td><%=i.amount.toLocaleString("en-US",{style:"currency", currency:"THB"})%></td>
            <td><%=i.note%></td>
            <td><% if (user?._id.equals(i.user)) { %>
            <!-- delete action -->
              <form action="/income/<%= i._id %>?_method=DELETE" method="POST">
                <button type="submit">X</button>
              </form>
            <% } %>
          </td>
        </tr>
        <%});%>
        <tr>
        <!-- Total row in THB currency -->
        <td colspan="1"></td>
        <td><strong>Total Income</strong></td>
        <td><strong><%= totalIncome.toLocaleString("en-US",{style:"currency", currency:"THB"}) %></strong></td>
      </tr>
    </tbody>
</table>
</br></br>
<!-- add New Income -->
<button><a href='/income/new'>ADD INCOME</a></button>
</div>

</br></br>
<div class='expense'>
    <h2>Expense Details</h2>
<table id='expense'>
    <thead>
        <tr>
            <th>Date</th>
            <th>Detail</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Note</th>
        </tr>
    </thead>
    <tbody>
        <% let totalExpense = 0 %>
        <%expense.forEach((e) => {%>
        <!-- get the total amount sum -->
        <% totalExpense += e.amount %>
        <tr>
            <!-- formate Date Object -->
            <% date= e.date.getDate().toString().padStart(2, '0') + '-' + (e.date.getMonth() + 1).toString().padStart(2, '0') + '-'+ e.date.getFullYear()%>
            <td><%= date %></td>
            <td><%=e.detail%></td>
            <td><%=e.category.category%></td>
            <!-- convert the amount to currency THB -->
            <td><%=e.amount.toLocaleString("en-US",{style:"currency", currency:"THB"})%></td>
            <td><%=e.note%></td>

            <% const filteredItems = expense.filter(e => {%>
                <% console.log(outputMonth) %>
                <% return e.date.toLocaleString('default', {month: 'short'} ) === outputMonth %>

                <%}); %>

<!-- Render filtered items -->
            <% filteredItems.forEach(item => { %>
            <tr>
            <td>Date: <%= item.date %></td>
            <td>Detail: <%= item.detail %></td>
            </tr>
            <% }); %>

            <td><% if (user?._id.equals(e.user)) { %>
            <!-- delete action -->
              <form action="/expense/<%= e._id %>?_method=DELETE" method="POST">
                <button type="submit">X</button>
              </form>
            <% } %>
          </td>
        </tr>
        <%});%>
        <tr>
        <!-- Total row in THB currency -->
        <td colspan="2"></td>
        <td><strong>Total Expense</strong></td>
        <td><strong><%= totalExpense.toLocaleString("en-US",{style:"currency", currency:"THB"}) %></strong></td>
      </tr>
    </tbody>
</table>
</br></br>
<!-- add New Expense -->
<button><a href='/expense/new'>ADD EXPENSE</a></button>
</div>


<%- include('../partials/footer') %>