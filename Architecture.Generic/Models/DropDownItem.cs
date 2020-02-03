namespace Architecture.Generic.Models
{
    public class DropDownItem
    {
        public DropDownItem()
        {
        }

        public DropDownItem(string text, string value)
        {
            Text = text;
            Value = value;
        }


        public string Text { get; set; }
        public string Value { get; set; }
    }

    public class DropDownReference
    {
        public int ReferenceId { get; set; }
        public string Text { get; set; }
        public string Value { get; set; }
    }
}
