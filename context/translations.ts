
export const translations = {
  fr: {
    common: {
      back: "Retour",
      cancel: "Annuler",
      save: "Enregistrer",
      validate: "Valider",
      edit: "Modifier",
      delete: "Supprimer",
      loading: "Chargement...",
      download: "Télécharger",
      print: "Imprimer",
      share: "Partager",
      filter: "Filtrer",
      see_all: "Voir tout",
      load_more: "Charger plus",
      error: "Erreur",
      success: "Succès",
      unknown: "Inconnu",
      date: "Date",
      amount: "Montant",
      status: "Statut",
      reference: "Référence",
      description: "Description",
      yes: "Oui",
      no: "Non",
      add: "Ajouter"
    },
    nav: {
      dashboard: "Tableau de bord",
      transactions: "Transactions",
      transfers: "Virements",
      cards: "Cartes",
      notifications: "Notifications",
      settings: "Paramètres",
      profile: "Mon Profil",
      admin: "Administration",
      logout: "Déconnexion",
      home: "Accueil",
      activity: "Activité"
    },
    auth: {
      title: "Connexion",
      subtitle: "Ravi de vous revoir. Veuillez entrer vos accès.",
      label_id: "Identifiant ou E-mail",
      label_pass: "Mot de passe",
      forgot: "Oublié ?",
      btn_login: "Se connecter",
      new_account: "Nouveau ?",
      create_account: "Créer un compte",
      hero_title: "L'excellence financière, à portée de clic.",
      hero_subtitle: "Accédez à votre portefeuille institutionnel et gérez vos actifs avec la sécurité d'une banque privée.",
      cert_dsp2: "Certifié DSP2",
      cert_aes: "Chiffrement AES-256"
    },
    dashboard: {
      welcome: "Bonjour",
      wealth_estimated: "Patrimoine Total Estimé",
      analysis: "Voir l'analyse détaillée",
      quick_transfer_title: "Virement Rapide",
      send_money: "Envoyer",
      add_beneficiary: "Ajouter",
      quick_transfer_action: "Nouveau Virement",
      quick_card: "Gérer ma Carte",
      quick_rib: "Copier mon RIB",
      quick_docs: "Relevés & Docs",
      rib_copied: "IBAN Copié !",
      expenses_breakdown: "Répartition des Dépenses",
      total_out: "Total Sorties",
      recent_moves: "Derniers Mouvements",
      no_tx: "Aucune transaction récente",
      chart: {
        housing: "Logement",
        food: "Alim.",
        leisure: "Loisirs",
        savings: "Épargne"
      },
      accounts: {
        checking: "Compte Courant",
        savings: "Livret A",
        limit: "Plafond",
        interest: "d'intérêts (YTD)"
      }
    },
    transactions: {
      title: "Transactions",
      subtitle: "Gérez vos mouvements financiers en temps réel.",
      monthly_statement: "Relevé mensuel",
      export: "Exporter",
      table: {
        merchant: "Marchand",
        category: "Catégorie"
      },
      details: {
        title: "DÉTAILS",
        account: "Compte",
        category: "Catégorie",
        status: "Statut",
        view_receipt: "Voir le reçu officiel"
      }
    },
    cards: {
      title: "Gestion des Cartes",
      subtitle: "Contrôlez vos moyens de paiement.",
      new_card: "Nouvelle carte",
      physical: "Carte Physique",
      virtual: "Carte Virtuelle",
      blocked: "Bloquée",
      active: "Active",
      operational: "Opérationnelle",
      holder: "TITULAIRE",
      expires: "EXPIRE",
      cvc: "CVC",
      actions: {
        lock: "Bloquer",
        unlock: "Débloquer",
        pin: "PIN",
        limits: "Limites"
      },
      limits: {
        payment: "Plafond Paiement",
        withdrawal: "Retraits DAB",
        monthly: "mensuel",
        weekly: "hebdo",
        spent: "Dépensé ce mois-ci",
        withdrawn: "Retiré cette semaine"
      },
      modal: {
        title: "Commander une carte",
        physical_desc: "Premium, sans contact, internationale.",
        virtual_desc: "Instantanée, pour vos achats en ligne.",
        pin_title: "Code PIN",
        pin_desc: "Voici le code PIN pour votre carte terminant par",
        close: "Fermer",
        limits_title: "Plafonds de la carte",
        payment_30d: "Paiements (30j)",
        withdrawal_7d: "Retraits (7j)",
        info_update: "Les modifications de plafond sont effectives immédiatement mais peuvent être sujettes à une révision de sécurité."
      },
      cta: {
        title: "Nouvelle carte ?",
        desc: "Commandez une carte physique premium ou créez une carte virtuelle instantanément.",
        btn: "Commander maintenant"
      }
    },
    transfers: {
      title: "Virement International",
      step1: "Bénéficiaire",
      step2: "Montant",
      step3: "Sécurité",
      step1_desc: "Étape 1 : Sélectionnez le destinataire de votre transfert.",
      step2_desc: "Envoyez des fonds en toute sécurité.",
      step3_desc: "Vérifiez les détails avant de confirmer l'opération.",
      search_label: "Rechercher un bénéficiaire",
      search_placeholder: "Nom, IBAN ou email...",
      add_btn: "Ajouter un nouveau bénéficiaire",
      fav_title: "Bénéficiaires favoris",
      no_fav: "Aucun bénéficiaire trouvé.",
      info_sepa_title: "Virements hors zone SEPA",
      info_sepa_desc: "Les virements internationaux peuvent prendre jusqu'à 3 jours ouvrables. Assurez-vous que les informations du bénéficiaire sont exactes.",
      help: "Besoin d'aide ?",
      contact: "Contacter le support",
      form: {
        name: "Nom du titulaire / Raison sociale",
        iban: "IBAN / Numéro de compte",
        bank: "Nom de la Banque (Optionnel)",
        info: "En ajoutant ce bénéficiaire, vous certifiez que les informations fournies sont exactes.",
        submit: "Enregistrer et Continuer"
      },
      amount: {
        source: "Vous envoyez",
        motif: "Motif du virement",
        fees: "Frais",
        net: "Net",
        rate: "Taux garanti (24h)",
        dest: "Le bénéficiaire reçoit",
        type: "Type de virement",
        instant: "Instantané",
        standard: "Standard",
        arrival: "Arrivée estimée",
        today: "Aujourd'hui, immédiat",
        tomorrow: "Demain",
        validate: "Valider",
        security_check: "Vérification de sécurité",
        security_desc: "Ce bénéficiaire a été ajouté récemment. Une authentification forte (SCA) sera requise."
      },
      confirm: {
        summary: "Récapitulatif du virement",
        sent: "Montant envoyé",
        rate: "Taux de change",
        fees: "Frais de service",
        received: "Le bénéficiaire reçoit",
        pin_title: "Code Secret",
        pin_desc: "Entrez votre code à 4 chiffres pour valider le virement.",
        pin_error: "Code incorrect. Réessayez.",
        btn_confirm: "Confirmer le virement",
        secure_validation: "Validation Sécurisée"
      },
      success: {
        title: "Transfert Envoyé",
        msg: "Votre virement a été envoyé avec succès.",
        download_receipt: "Télécharger le reçu (PNG)",
        back_dashboard: "Retour au tableau de bord",
        email_sent: "Un e-mail de confirmation a été envoyé à votre adresse habituelle."
      }
    },
    receipt: {
      actions: "ACTIONS",
      download: "Télécharger PNG",
      share: "Partager le reçu",
      print: "Imprimer",
      security_note_title: "NOTE DE SÉCURITÉ",
      security_note_desc: "Ce reçu est un document officiel généré par Finanzas Investment. Utilisez le code QR pour vérifier l'authenticité de cette transaction sur nos serveurs.",
      success_title: "Virement Effectué",
      amount_title: "MONTANT DU VIREMENT",
      date_label: "DATE ET HEURE",
      type_label: "TYPE DE TRANSFERT",
      source_label: "COMPTE SOURCE",
      beneficiary_label: "BÉNÉFICIAIRE",
      rate_label: "TAUX DE CHANGE RÉEL",
      converted_label: "MONTANT CONVERTI",
      guarantee: "GARANTI PAR FINANZAS SECURITY",
      legal_desc: "Ce document électronique tient lieu de preuve de transaction. Toute falsification est passible de poursuites.",
      check_label: "VÉRIFIER REÇU",
      footer: "© 2023 Finanzas Investment S.A. Registered in the EU. Licensed as a Payment Institution."
    },
    statement: {
      title: "Relevé de Compte",
      period: "Période",
      legal_title: "Information Légale",
      legal_text: "Le présent relevé est établi sous réserve des opérations en cours de traitement. En cas de désaccord sur les opérations figurant sur ce relevé, vous disposez d'un délai de 30 jours pour nous faire part de vos observations par courrier recommandé.",
      standard_title: "Standard d'Exportation",
      standard_text: "Ce document est un relevé de compte officiel généré au format d'exportation standard (ISO-20022 compliant). Les montants sont exprimés en Euros (EUR). Document authentifié par signature électronique Finanzas Investment.",
      holder: "Titulaire du compte",
      account_info: "Informations de compte",
      account_label: "Compte",
      label_label: "Intitulé",
      date_label: "Date d'émission",
      balance_start: "Solde Initial",
      total_credit: "Total Crédits (+)",
      total_debit: "Total Débits (-)",
      balance_current: "Solde Actuel",
      operations_details: "Détail des opérations",
      col_date: "Date",
      col_label: "Libellé de l'opération",
      col_type: "Type",
      col_amount: "Montant (EUR)",
      type_credit: "Crédit",
      type_debit: "Débit",
      no_ops: "Aucune transaction enregistrée pour cette période.",
      help: "Besoin d'aide pour lire votre relevé ?",
      help_link: "Consultez notre guide"
    },
    admin: {
      nav_general: "Général",
      nav_treasury: "Trésorerie",
      users: "Utilisateurs",
      accounts: "Comptes",
      audit: "Audit & Logs",
      compliance: "Conformité",
      injection_portal: "Portail d'Injection",
      secure_interface: "Interface sécurisée pour l'allocation de fonds institutionnels.",
      new_tx: "Nouvelle Transaction",
      target_beneficiary: "Bénéficiaire cible",
      verified: "Vérifié",
      amount_inject: "Montant à injecter",
      source_funds: "Source des fonds",
      central_treasury: "Trésorerie Centrale",
      motif_compliance: "Motif de conformité",
      motif_placeholder: "Ex: Dividendes annuels, Prime...",
      system_operational: "Système opérationnel",
      execute: "Exécuter l'injection",
      history: "Historique Récent",
      col_date: "Date",
      col_beneficiary: "Bénéficiaire",
      col_amount: "Montant",
      col_motif: "Motif",
      col_status: "Statut",
      status_processing: "En traitement",
      status_success: "Succès",
      toast_success: "Injection confirmée",
      toast_desc: "Les fonds sont disponibles sur le compte.",
      reset_data: "Réinitialiser les données",
      reset_desc: "Attention : Restaure l'état initial de l'application.",
      danger_zone: "Zone de Danger",
      reset_title: "Données réinitialisées",
      reset_toast: "L'application est revenue à son état d'origine."
    },
    notifications: {
      title: "Centre de Notifications",
      mark_all: "Tout marquer comme lu",
      tabs: {
        all: "Toutes",
        alerts: "Alertes",
        transactions: "Transactions"
      },
      sections: {
        today: "Aujourd'hui",
        earlier: "Plus tôt"
      },
      empty: "Aucune notification pour le moment.",
      settings_title: "Paramètres",
      channels: "Canaux de diffusion",
      categories: "Catégories d'alertes",
      cat_transfers: "Virements & Flux",
      cat_security: "Sécurité du Compte",
      save_settings: "Sauvegarder les réglages"
    },
    settings: {
      title: "Paramètres",
      subtitle: "Gérez vos préférences et votre sécurité.",
      tabs: {
        profile: "Profil",
        security: "Sécurité",
        notifications: "Notifications",
        region: "Langue et Région"
      },
      region_section: {
        lang_title: "Langue de l'interface",
        currency_title: "Devise de référence"
      }
    },
    profile: {
      title: "Mon Profil",
      edit_mode: "MODE ÉDITION",
      kyc_validated: "KYC Validé",
      protected: "Compte protégé (2FA actif)",
      tabs: {
        identity: "Identité & Fiscalité",
        security: "Sécurité",
        documents: "Documents",
        settings: "Paramètres"
      },
      identity: {
        title: "Identité",
        firstname: "Prénom",
        lastname: "Nom",
        dob: "Date de naissance",
        nationality: "Nationalité"
      },
      contact: {
        title: "Coordonnées",
        email: "Email",
        mobile: "Mobile"
      },
      fiscal: {
        title: "Fiscalité & Résidence",
        address: "Adresse",
        zip: "Code Postal",
        city: "Ville",
        country: "Pays",
        tin: "Numéro Fiscal (TIN)"
      },
      security: {
        auth_title: "Authentification",
        password: "Mot de passe",
        modified: "Modifié il y a",
        pin: "Code secret",
        pin_desc: "Pour virements",
        devices_title: "Appareils",
        current: "Actuel"
      },
      docs: {
        title: "Mes Documents",
        id_front: "Carte d'Identité (Recto)",
        id_back: "Carte d'Identité (Verso)",
        proof_address: "Justificatif de domicile",
        validated: "Validé",
        add_btn: "Ajouter un document"
      },
      footer: "Finanzas Investment est une plateforme régulée. Toutes vos données sont traitées dans le strict respect de la réglementation européenne sur la protection des données personnelles (RGPD)."
    },
    account: {
      balance_avail: "Solde Disponible",
      copy_rib: "Copier RIB",
      copied: "Copié",
      edit_rib: "Modifier le RIB",
      graph_evolution: "Évolution (30 jours)",
      income_month: "Entrées (Mois)",
      outcome_month: "Sorties (Mois)",
      linked_card: "Carte Liée",
      infos: "Informations",
      overdraft: "Découvert autorisé",
      rate: "Taux débiteur",
      opened_on: "Ouvert le",
      history: "Historique des opérations",
      settings_modal: {
        title: "Paramètres du compte",
        rename: "Renommer le compte",
        rename_desc: "Personnaliser l'intitulé",
        edit_rib_desc: "Mettre à jour l'IBAN affiché",
        download_rib: "Télécharger RIB (PDF)",
        download_desc: "Format officiel bancaire",
        limits: "Gérer les plafonds",
        limits_desc: "Virements et découvert",
        close_account: "Clôturer ce compte"
      },
      modals: {
        edit_rib_title: "Modifier le RIB",
        edit_rib_warning: "Attention : Vous êtes sur le point de modifier l'IBAN affiché. Ceci se répercutera instantanément sur toute la plateforme.",
        new_iban: "Nouvel IBAN",
        rename_title: "Renommer le compte",
        account_name: "Nom du compte",
        overdraft_title: "Découvert Autorisé",
        auth_amount: "Montant autorisé (€)",
        overdraft_warning: "Une augmentation du découvert est soumise à étude. Pour cette démo, la mise à jour est immédiate."
      }
    },
    notif_templates: {
        transfer_sent_title: "Virement envoyé",
        transfer_sent_msg: "Virement de {amount} € envoyé à {name}.",
        beneficiary_added_title: "Bénéficiaire ajouté",
        beneficiary_added_msg: "{name} a été ajouté à votre liste de bénéficiaires.",
        card_added_title: "Nouvelle carte",
        card_added_msg: "Nouvelle carte ({type}) ajoutée avec succès.",
        card_locked_title: "Carte verrouillée",
        card_locked_msg: "Votre carte a été temporairement verrouillée.",
        card_unlocked_title: "Carte déverrouillée",
        card_unlocked_msg: "Votre carte est à nouveau active.",
        limits_updated_title: "Plafonds mis à jour",
        limits_updated_msg: "Vos plafonds de carte ont été modifiés.",
        language_changed_title: "Langue modifiée",
        language_changed_msg: "La langue de l'application est maintenant : {lang}.",
        currency_changed_title: "Devise modifiée",
        currency_changed_msg: "Devise de référence changée pour : {currency}.",
        pin_changed_title: "Code PIN modifié",
        pin_changed_msg: "Votre code de sécurité a été mis à jour.",
        injection_title: "Fonds injectés",
        injection_msg: "{amount} {currency} ajoutés - Motif : {motif}.",
        reset_done_title: "Réinitialisation",
        reset_done_msg: "Toutes les données de l'application ont été restaurées."
    }
  },
  en: {
    common: { back: "Back", cancel: "Cancel", save: "Save", validate: "Validate", edit: "Edit", delete: "Delete", loading: "Loading...", download: "Download", print: "Print", share: "Share", filter: "Filter", see_all: "See all", load_more: "Load more", error: "Error", success: "Success", unknown: "Unknown", date: "Date", amount: "Amount", status: "Status", reference: "Reference", description: "Description", yes: "Yes", no: "No", add: "Add" },
    nav: { dashboard: "Dashboard", transactions: "Transactions", transfers: "Transfers", cards: "Cards", notifications: "Notifications", settings: "Settings", profile: "My Profile", admin: "Admin Panel", logout: "Logout", home: "Home", activity: "Activity" },
    auth: { title: "Login", subtitle: "Glad to see you back. Please enter your credentials.", label_id: "ID or Email", label_pass: "Password", forgot: "Forgot?", btn_login: "Log in", new_account: "New?", create_account: "Create an account", hero_title: "Financial excellence, a click away.", hero_subtitle: "Access your institutional portfolio and manage your assets with private banking security.", cert_dsp2: "PSD2 Certified", cert_aes: "AES-256 Encryption" },
    dashboard: { welcome: "Hello", wealth_estimated: "Estimated Total Wealth", analysis: "See detailed analysis", quick_transfer_title: "Quick Transfer", send_money: "Send", add_beneficiary: "Add New", quick_transfer_action: "New Transfer", quick_card: "Manage Card", quick_rib: "Copy IBAN", quick_docs: "Statements & Docs", rib_copied: "IBAN Copied!", expenses_breakdown: "Expenses Breakdown", total_out: "Total Out", recent_moves: "Recent Movements", no_tx: "No recent transactions", chart: { housing: "Housing", food: "Food", leisure: "Leisure", savings: "Savings" }, accounts: { checking: "Checking Account", savings: "Savings", limit: "Limit", interest: "interest (YTD)" } },
    transactions: { title: "Transactions", subtitle: "Manage your financial movements in real time.", monthly_statement: "Monthly Statement", export: "Export", table: { merchant: "Merchant", category: "Category" }, details: { title: "DETAILS", account: "Account", category: "Category", status: "Status", view_receipt: "View official receipt" } },
    cards: { title: "Cards Management", subtitle: "Control your payment methods.", new_card: "New Card", physical: "Physical Card", virtual: "Virtual Card", blocked: "Blocked", active: "Active", operational: "Operational", holder: "HOLDER", expires: "EXPIRES", cvc: "CVC", actions: { lock: "Lock", unlock: "Unlock", pin: "PIN", limits: "Limits" }, limits: { payment: "Payment Limit", withdrawal: "ATM Withdrawals", monthly: "monthly", weekly: "weekly", spent: "Spent this month", withdrawn: "Withdrawn this week" }, modal: { title: "Order a card", physical_desc: "Premium, contactless, international.", virtual_desc: "Instant, for online purchases.", pin_title: "PIN Code", pin_desc: "Here is the PIN for your card ending in", close: "Close", limits_title: "Card Limits", payment_30d: "Payments (30d)", withdrawal_7d: "Withdrawals (7d)", info_update: "Limit changes are effective immediately but may be subject to security review." }, cta: { title: "New card?", desc: "Order a premium physical card or create a virtual card instantly.", btn: "Order now" } },
    transfers: { title: "International Transfer", step1: "Beneficiary", step2: "Amount", step3: "Security", step1_desc: "Step 1: Select the recipient of your transfer.", step2_desc: "Send funds securely.", step3_desc: "Check details before confirming.", search_label: "Search beneficiary", search_placeholder: "Name, IBAN or email...", add_btn: "Add new beneficiary", fav_title: "Favorite beneficiaries", no_fav: "No beneficiary found.", info_sepa_title: "Non-SEPA Transfers", info_sepa_desc: "International transfers can take up to 3 business days. Ensure beneficiary details are accurate.", help: "Need help?", contact: "Contact support", form: { name: "Holder Name / Company", iban: "IBAN / Account Number", bank: "Bank Name (Optional)", info: "By adding this beneficiary, you certify the information is accurate.", submit: "Save and Continue" }, amount: { source: "You send", motif: "Transfer reason", fees: "Fees", net: "Net", rate: "Guaranteed rate (24h)", dest: "Beneficiary receives", type: "Transfer Type", instant: "Instant", standard: "Standard", arrival: "Estimated arrival", today: "Today, immediate", tomorrow: "Tomorrow", validate: "Validate", security_check: "Security Check", security_desc: "This beneficiary was added recently. Strong authentication (SCA) will be required." }, confirm: { summary: "Transfer Summary", sent: "Sent Amount", rate: "Exchange Rate", fees: "Service Fees", received: "Beneficiary receives", pin_title: "Secret Code", pin_desc: "Enter your 4-digit code to validate the transfer.", pin_error: "Incorrect code. Try again.", btn_confirm: "Confirm Transfer", secure_validation: "Secure Validation" }, success: { title: "Transfer Sent", msg: "Your transfer has been sent successfully.", download_receipt: "Download Receipt (PNG)", back_dashboard: "Back to Dashboard", email_sent: "A confirmation email has been sent to your address." } },
    receipt: { actions: "ACTIONS", download: "Download PNG", share: "Share Receipt", print: "Print", security_note_title: "SECURITY NOTE", security_note_desc: "This receipt is an official document generated by Finanzas Investment. Use the QR code to verify the authenticity of this transaction on our servers.", success_title: "Transfer Successful", amount_title: "TRANSFER AMOUNT", date_label: "DATE AND TIME", type_label: "TRANSFER TYPE", source_label: "SOURCE ACCOUNT", beneficiary_label: "BENEFICIARY", rate_label: "REAL EXCHANGE RATE", converted_label: "CONVERTED AMOUNT", guarantee: "GUARANTEED BY FINANZAS SECURITY", legal_desc: "This electronic document serves as proof of transaction. Falsification is punishable by law.", check_label: "VERIFY RECEIPT", footer: "© 2023 Finanzas Investment S.A. Registered in the EU. Licensed as a Payment Institution." },
    statement: { title: "Account Statement", period: "Period", legal_title: "Legal Information", legal_text: "This statement is issued subject to transactions in process. In case of disagreement with the operations listed, you have 30 days to notify us by registered mail.", standard_title: "Export Standard", standard_text: "This document is an official account statement generated in standard export format (ISO-20022 compliant). Amounts are in Euros (EUR). Document authenticated by Finanzas Investment electronic signature.", holder: "Account Holder", account_info: "Account Information", account_label: "Account", label_label: "Label", date_label: "Issue Date", balance_start: "Opening Balance", total_credit: "Total Credits (+)", total_debit: "Total Debits (-)", balance_current: "Current Balance", operations_details: "Operations Detail", col_date: "Date", col_label: "Operation Label", col_type: "Type", col_amount: "Amount (EUR)", type_credit: "Credit", type_debit: "Debit", no_ops: "No transactions recorded for this period.", help: "Need help reading your statement?", help_link: "Check our guide" },
    admin: { nav_general: "General", nav_treasury: "Treasury", users: "Users", accounts: "Accounts", audit: "Audit & Logs", compliance: "Compliance", injection_portal: "Injection Portal", secure_interface: "Secure interface for institutional fund allocation.", new_tx: "New Transaction", target_beneficiary: "Target Beneficiary", verified: "Verified", amount_inject: "Amount to inject", source_funds: "Fund Source", central_treasury: "Central Treasury", motif_compliance: "Compliance Reason", motif_placeholder: "Ex: Annual Dividends, Bonus...", system_operational: "System Operational", execute: "Execute Injection", history: "Recent History", col_date: "Date", col_beneficiary: "Beneficiary", col_amount: "Amount", col_motif: "Reason", col_status: "Status", status_processing: "Processing", status_success: "Success", toast_success: "Injection confirmed", toast_desc: "Funds are available on the account.", reset_data: "Reset Data", reset_desc: "Warning: Restores the application to its initial state.", danger_zone: "Danger Zone", reset_title: "Data Reset", reset_toast: "The application has been reset to its original state." },
    notifications: { title: "Notification Center", mark_all: "Mark all as read", tabs: { all: "All", alerts: "Alerts", transactions: "Transactions" }, sections: { today: "Today", earlier: "Earlier" }, empty: "No notifications yet.", settings_title: "Settings", channels: "Channels", categories: "Alert Categories", cat_transfers: "Transfers & Flows", cat_security: "Account Security", save_settings: "Save settings" },
    settings: { title: "Settings", subtitle: "Manage your preferences and security.", tabs: { profile: "Profile", security: "Security", notifications: "Notifications", region: "Language & Region" }, region_section: { lang_title: "Interface Language", currency_title: "Reference Currency" } },
    profile: { title: "My Profile", edit_mode: "EDIT MODE", kyc_validated: "KYC Validated", protected: "Account protected (2FA active)", tabs: { identity: "Identity & Tax", security: "Security", documents: "Documents", settings: "Settings" }, identity: { title: "Identity", firstname: "First Name", lastname: "Last Name", dob: "Date of Birth", nationality: "Nationality" }, contact: { title: "Contact", email: "Email", mobile: "Mobile" }, fiscal: { title: "Tax & Residence", address: "Address", zip: "Zip Code", city: "City", country: "Country", tin: "Tax ID (TIN)" }, security: { auth_title: "Authentication", password: "Password", modified: "Modified", pin: "Secret Code", pin_desc: "For transfers", devices_title: "Devices", current: "Current" }, docs: { title: "My Documents", id_front: "ID Card (Front)", id_back: "ID Card (Back)", proof_address: "Proof of Address", validated: "Validated", add_btn: "Add Document" }, footer: "Finanzas Investment is a regulated platform. All your data is processed in strict compliance with GDPR." },
    account: { balance_avail: "Available Balance", copy_rib: "Copy IBAN", copied: "Copied", edit_rib: "Edit IBAN", graph_evolution: "Evolution (30 days)", income_month: "Income (Month)", outcome_month: "Outcome (Month)", linked_card: "Linked Card", infos: "Information", overdraft: "Overdraft Limit", rate: "Debit Rate", opened_on: "Opened on", history: "Transaction History", settings_modal: { title: "Account Settings", rename: "Rename Account", rename_desc: "Customize label", edit_rib_desc: "Update displayed IBAN", download_rib: "Download IBAN (PDF)", download_desc: "Official bank format", limits: "Manage Limits", limits_desc: "Transfers and overdraft", close_account: "Close this account" }, modals: { edit_rib_title: "Modify IBAN", edit_rib_warning: "Warning: You are about to modify the displayed IBAN. This will reflect instantly across the platform.", new_iban: "New IBAN", rename_title: "Rename Account", account_name: "Account Name", overdraft_title: "Overdraft Limit", auth_amount: "Authorized Amount (€)", overdraft_warning: "Overdraft increase is subject to review. For this demo, update is immediate." } },
    notif_templates: {
        transfer_sent_title: "Transfer sent",
        transfer_sent_msg: "Transfer of {amount} € sent to {name}.",
        beneficiary_added_title: "Beneficiary added",
        beneficiary_added_msg: "{name} has been added to your beneficiaries.",
        card_added_title: "New card",
        card_added_msg: "New card ({type}) added successfully.",
        card_locked_title: "Card locked",
        card_locked_msg: "Your card has been temporarily locked.",
        card_unlocked_title: "Card unlocked",
        card_unlocked_msg: "Your card is now active again.",
        limits_updated_title: "Limits updated",
        limits_updated_msg: "Your card limits have been modified.",
        language_changed_title: "Language changed",
        language_changed_msg: "App language is now: {lang}.",
        currency_changed_title: "Currency changed",
        currency_changed_msg: "Reference currency changed to: {currency}.",
        pin_changed_title: "PIN changed",
        pin_changed_msg: "Your security code has been updated.",
        injection_title: "Funds injected",
        injection_msg: "{amount} {currency} added - Reason: {motif}.",
        reset_done_title: "Reset",
        reset_done_msg: "All application data has been restored."
    }
  },
  // ... autres langues similaires, je mets les placeholders pour la lisibilité
  es: {
    // ...
    admin: { nav_general: "General", nav_treasury: "Tesorería", users: "Usuarios", accounts: "Cuentas", audit: "Auditoría", compliance: "Cumplimiento", injection_portal: "Portal de Inyección", secure_interface: "Interfaz segura para asignación de fondos institucionales.", new_tx: "Nueva Transacción", target_beneficiary: "Beneficiario objetivo", verified: "Verificado", amount_inject: "Importe a inyectar", source_funds: "Fuente de fondos", central_treasury: "Tesorería Central", motif_compliance: "Motivo de cumplimiento", motif_placeholder: "Ej: Dividendos anuales...", system_operational: "Sistema operativo", execute: "Ejecutar Inyección", history: "Historial Reciente", col_date: "Fecha", col_beneficiary: "Beneficiario", col_amount: "Importe", col_motif: "Motivo", col_status: "Estado", status_processing: "Procesando", status_success: "Éxito", toast_success: "Inyección confirmada", toast_desc: "Los fondos están disponibles.", reset_data: "Restablecer Datos", reset_desc: "Advertencia: Restaura la aplicación a su estado inicial.", danger_zone: "Zona de Peligro", reset_title: "Datos Restablecidos", reset_toast: "La aplicación ha vuelto a su estado original." },
    // ...
    notif_templates: {
        // ...
        reset_done_title: "Reinicio",
        reset_done_msg: "Todos los datos de la aplicación han sido restaurados."
    }
  },
  de: {
    // ...
    admin: { nav_general: "Allgemein", nav_treasury: "Treasury", users: "Benutzer", accounts: "Konten", audit: "Audit & Logs", compliance: "Compliance", injection_portal: "Injektionsportal", secure_interface: "Sichere Schnittstelle für institutionelle Fondszuweisung.", new_tx: "Neue Transaktion", target_beneficiary: "Zielempfänger", verified: "Verifiziert", amount_inject: "Zu injizierender Betrag", source_funds: "Mittelherkunft", central_treasury: "Zentrales Treasury", motif_compliance: "Compliance-Grund", motif_placeholder: "Bsp: Jahresdividende...", system_operational: "System betriebsbereit", execute: "Injektion ausführen", history: "Verlauf", col_date: "Datum", col_beneficiary: "Empfänger", col_amount: "Betrag", col_motif: "Grund", col_status: "Status", status_processing: "In Bearbeitung", status_success: "Erfolg", toast_success: "Injektion bestätigt", toast_desc: "Gelder sind verfügbar.", reset_data: "Daten zurücksetzen", reset_desc: "Warnung: Stellt den ursprünglichen Zustand der Anwendung wieder her.", danger_zone: "Gefahrenzone", reset_title: "Daten zurückgesetzt", reset_toast: "Die Anwendung wurde in den Originalzustand versetzt." },
    // ...
    notif_templates: {
        // ...
        reset_done_title: "Zurücksetzen",
        reset_done_msg: "Alle Anwendungsdaten wurden wiederhergestellt."
    }
  },
  pt: {
    // ...
    admin: { nav_general: "Geral", nav_treasury: "Tesouraria", users: "Usuários", accounts: "Contas", audit: "Auditoria", compliance: "Compliance", injection_portal: "Portal de Injeção", secure_interface: "Interface segura para alocação de fundos institucionais.", new_tx: "Nova Transação", target_beneficiary: "Beneficiário alvo", verified: "Verificado", amount_inject: "Valor a injetar", source_funds: "Fonte de fundos", central_treasury: "Tesouraria Central", motif_compliance: "Motivo de compliance", motif_placeholder: "Ex: Dividendos anuais...", system_operational: "Sistema operacional", execute: "Executar Injeção", history: "Histórico", col_date: "Data", col_beneficiary: "Beneficiário", col_amount: "Valor", col_motif: "Motivo", col_status: "Status", status_processing: "Processando", status_success: "Sucesso", toast_success: "Injeção confirmada", toast_desc: "Fundos disponíveis.", reset_data: "Redefinir Dados", reset_desc: "Aviso: Restaura o aplicativo ao estado inicial.", danger_zone: "Zona de Perigo", reset_title: "Dados Redefinidos", reset_toast: "O aplicativo voltou ao estado original." },
    // ...
    notif_templates: {
        // ...
        reset_done_title: "Redefinição",
        reset_done_msg: "Todos os dados do aplicativo foram restaurados."
    }
  },
  it: {
    // ...
    admin: { nav_general: "Generale", nav_treasury: "Tesoreria", users: "Utenti", accounts: "Conti", audit: "Audit", compliance: "Compliance", injection_portal: "Portale Iniezione", secure_interface: "Interfaccia sicura per allocazione fondi istituzionali.", new_tx: "Nuova Transazione", target_beneficiary: "Beneficiario target", verified: "Verificato", amount_inject: "Importo da iniettare", source_funds: "Fonte fondi", central_treasury: "Tesoreria Centrale", motif_compliance: "Motivo compliance", motif_placeholder: "Es: Dividendi annuali...", system_operational: "Sistema operativo", execute: "Esegui Iniezione", history: "Cronologia", col_date: "Data", col_beneficiary: "Beneficiario", col_amount: "Importo", col_motif: "Motivo", col_status: "Stato", status_processing: "In elaborazione", status_success: "Successo", toast_success: "Iniezione confermata", toast_desc: "Fondi disponibili.", reset_data: "Reimposta Dati", reset_desc: "Attenzione: Ripristina l'applicazione allo stato iniziale.", danger_zone: "Zona di Pericolo", reset_title: "Dati Reimpostati", reset_toast: "L'applicazione è tornata allo stato originale." },
    // ...
    notif_templates: {
        // ...
        reset_done_title: "Ripristino",
        reset_done_msg: "Tutti i dati dell'applicazione sono stati ripristinati."
    }
  }
};
