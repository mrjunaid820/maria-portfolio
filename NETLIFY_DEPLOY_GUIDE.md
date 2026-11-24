# 🚀 Complete Netlify Deployment Guide for Maria Majid's Portfolio

Your portfolio at `C:\Users\User\Desktop\m portfolio` is now **100% Netlify-ready** with:
- ✅ `netlify.toml` pre-configured with security headers, asset caching, and 404 routing
- ✅ `_redirects` file for instant Netlify edge routing
- ✅ Native **Netlify Forms** integration with automated spam honeypot
- ✅ Custom branded `404.html` page
- ✅ Fully functional PDF CV download link

---

## ⚡ Method 1: Instant Drag & Drop (Fastest – 30 Seconds, No Code Needed)

This is the easiest and fastest way to deploy your website live on the internet:

1. **Open Netlify in your browser**:
   Go to [https://app.netlify.com/drop](https://app.netlify.com/drop) (log in or sign up with your free Netlify account).
2. **Drag the portfolio folder**:
   - Open your file explorer to `C:\Users\User\Desktop\`.
   - Drag the entire **`m portfolio`** folder and drop it onto the Netlify webpage box that says *"Drag and drop your site output folder here"*.
3. **Your site is LIVE!**
   - In 10 to 15 seconds, Netlify will generate your live public link (e.g. `https://peaceful-starburst-XXXXXX.netlify.app`).

---

## 🏷️ Setting Your Custom Free Domain Name on Netlify

After dropping your site, change the random URL to your professional name:

1. On your Netlify dashboard, click on your site.
2. Go to **Site Configuration** (or **Site Settings**) > **Change site name**.
3. Type: `maria-majid` or `mariamajid-dev` (or any available name).
4. Click **Save**.
5. Your portfolio will now be accessible worldwide at:
   **`https://maria-majid.netlify.app`**

---

## 📬 Receiving Contact Form Submissions in Your Gmail

Because we added Netlify Forms integration, visitors can send you messages directly through the form on your website:

1. In your Netlify dashboard, click the **Forms** tab. You will see the form named **`contact`**.
2. Click **Form settings** > **Form notifications**.
3. Click **Add notification** > **Email notification**.
4. Set the email address to:
   `mariamajid786mani@gmail.com`
5. Select *"Any new submission"* and click **Save**.
6. Now, whenever an employer or recruiter fills out your contact form, you will receive an instant notification in your inbox!

---

## 🔄 Method 2: Deploying via GitHub (Automated Updates)

If you use GitHub and want your site to update automatically whenever you push changes:

1. Initialize a git repository and push your folder to GitHub:
   ```bash
   cd "C:\Users\User\Desktop\m portfolio"
   git init
   git add .
   git commit -m "Maria Majid portfolio initial release"
   git branch -M main
   git remote add origin https://github.com/<your-username>/maria-majid-portfolio.git
   git push -u origin main
   ```
2. In Netlify:
   - Click **Add new site** > **Import an existing project**.
   - Choose **GitHub** and select `maria-majid-portfolio`.
   - Build settings are automatically detected from `netlify.toml`:
     - **Build command:** *(leave empty)*
     - **Publish directory:** `.`
   - Click **Deploy Site**.

---

## 💻 Method 3: Deploying via Netlify CLI (Optional)

If you prefer using the command line:

```powershell
# 1. Install Netlify CLI globally
npm install -g netlify-cli

# 2. Navigate to your portfolio
cd "C:\Users\User\Desktop\m portfolio"

# 3. Log in to Netlify
netlify login

# 4. Deploy to production
netlify deploy --prod --dir=.
```

---

## 📁 Files Prepared Specifically for Netlify:

| File | Purpose |
| :--- | :--- |
| `netlify.toml` | Build settings, cache headers for fast loading, CSP, and security headers |
| `_redirects` | Netlify edge redirect rules |
| `404.html` | Custom styled error page matching Maria's purple & midnight theme |
| `index.html` | Updated with `data-netlify="true"`, hidden honeypot spam protection |
| `js/main.js` | Updated with Netlify AJAX submission + graceful local/offline fallback |
