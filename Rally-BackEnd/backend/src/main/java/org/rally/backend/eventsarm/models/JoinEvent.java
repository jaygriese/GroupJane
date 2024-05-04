package org.rally.backend.eventsarm.models;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class JoinEvent extends AbstractEntity {

    private String userName;

    @ManyToOne
    private Event event;

    @NotBlank(message = "Who is joining the event?")
    private String attending;

    @NotBlank(message = "Who can we contact?")
    @Email(message = "Whoops! We need a valid email address.")
    private String contactEmail;

//    @NotBlank(message = "How many are coming?")
    @NotNull(message = "How many are coming?")
    private int numAttending;

    private String comment;

    public JoinEvent(String userName, Event event, String attending, String contactEmail, int numAttending, String comment) {
        this.userName = userName;
        this.event = event;
        this.attending = attending;
        this.contactEmail = contactEmail;
        this.numAttending = numAttending;
        this.comment = comment;
    }

    public JoinEvent() {};

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public String getAttending() {
        return attending;
    }

    public void setAttending(String attending) {
        this.attending = attending;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public int getNumAttending() {
        return numAttending;
    }

    public void setNumAttending(int numAttending) {
        this.numAttending = numAttending;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

//    @Override
//    public String toString() {
//        return "Join{" +
//                "name='" + name + '\'' +
//                ", contactEmail='" + contactEmail + '\'' +
//                ", numAttending=" + numAttending +
//                ", comment='" + comment + '\'' +
//                '}';
//    }
}
