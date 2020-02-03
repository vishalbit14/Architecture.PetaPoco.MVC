using System.Collections;
using System.Linq;
using System.Web.Mvc;

namespace Architecture.Generic.Infrastructure.Helper
{
    public static class HelperMethods
    {
        public static SelectList ToSelectList(this IEnumerable list, string selectedItem, string textFieldName, string valueFieldName, string captionName = "", string captionValue = "0")
        {
            SelectList selectList = new SelectList(list, valueFieldName, textFieldName, selectedItem);
            if (!string.IsNullOrEmpty(captionName))
            {
                var lst = selectList.ToList();
                lst.Insert(0, new SelectListItem
                {
                    Text = captionName,
                    Value = captionValue
                });
                selectList = new SelectList(lst.ToList(), "Value", "Text");
            }
            if (!string.IsNullOrEmpty(selectedItem) && selectList.SelectedValue == null)
            {
                SelectListItem item = selectList.ToList().FirstOrDefault(x => x.Value.ToLower() == selectedItem.ToLower());
                if (item != null && item.Value.ToLower() == selectedItem.ToLower())
                {
                    item.Selected = true;
                }
            }

            return selectList;
        }
    }
}
